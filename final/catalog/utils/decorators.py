from functools import wraps

import werkzeug.exceptions
from flask import request

from catalog import errors
from catalog.jwttoken import decode
from catalog.models.user import User

AUTH_HEADER_VALUE_PREFIX = "Bearer "
INVALID_TOKEN_MESSAGE = "Access token is not valid"


def parse_args_with(schema):
    """
    A convenient decorator to parse input with the specified schema
    and raise a bad request error if there are validation errors when parsing
    """

    def parse_args_with_decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                request_args = request.get_json() or {}
            except werkzeug.exceptions.BadRequest as e:
                # This could happen if the body is empty
                raise errors.BadRequest(e.description)

            if request.method == "GET":
                request_args = request.args.to_dict()

            parsed_args, args_errors = schema.load(request_args)
            if args_errors:
                raise errors.BadRequest(args_errors)

            kwargs["args"] = parsed_args
            return f(*args, **kwargs)

        return decorated_function

    return parse_args_with_decorator


def require_logged_in(f):
    """
    Check if the user has logged in by checking the Authorization header,
    and load the user into the argument `user` of the controller
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        if "Authorization" not in request.headers:
            raise errors.BadRequest()

        access_token = request.headers["Authorization"][len(AUTH_HEADER_VALUE_PREFIX) :]

        if access_token is None:
            raise errors.BadRequest("Not logged in")

        access_token_decoded = decode(access_token)

        if access_token_decoded is None:
            raise errors.Unauthorized(INVALID_TOKEN_MESSAGE)

        user_id = access_token_decoded.get("user_id")
        nonce = access_token_decoded.get("nonce")
        user = User.get_by_id(user_id)

        if user is None or user.access_token_nonce != nonce:
            raise errors.Unauthorized(INVALID_TOKEN_MESSAGE)

        kwargs["user"] = user

        return f(*args, **kwargs)

    return wrapper

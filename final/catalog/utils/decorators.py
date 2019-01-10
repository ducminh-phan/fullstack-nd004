from functools import wraps

import werkzeug.exceptions
from flask import request

from catalog import errors
from catalog.jwttoken import decode
from catalog.models.category import Category
from catalog.models.item import Item
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
        def wrapper(**kwargs):
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
            return f(**kwargs)

        return wrapper

    return parse_args_with_decorator


def require_logged_in(f):
    """
    Check if the user has logged in by checking the Authorization header,
    and load the user into the argument `user` of the controller
    """

    @wraps(f)
    def wrapper(**kwargs):
        if "Authorization" not in request.headers:
            raise errors.BadRequest()

        access_token = request.headers["Authorization"][len(AUTH_HEADER_VALUE_PREFIX) :]
        access_token_decoded = decode(access_token)

        if access_token_decoded is None:
            raise errors.Unauthorized(INVALID_TOKEN_MESSAGE)

        user_id = access_token_decoded.get("user_id")
        nonce = access_token_decoded.get("nonce")
        user = User.get_by_id(user_id)

        if user is None or user.access_token_nonce != nonce:
            raise errors.Unauthorized(INVALID_TOKEN_MESSAGE)

        kwargs["user"] = user

        return f(**kwargs)

    return wrapper


def require_owner(f):
    """Make sure the user is the owner of the item"""

    @wraps(f)
    def wrapper(*args, **kwargs):
        user = kwargs.get("user")
        item = kwargs.get("item")

        if not (user and item):
            raise errors.BadRequest()

        if user.id != item.user.id:
            raise errors.Forbidden()

        return f(*args, **kwargs)

    return wrapper


def check_category_exist(f):
    """
    Check if the category exists from the parameter category_id,
    and load the category into the argument `category`
    """

    @wraps(f)
    def wrapper(**kwargs):
        category_id = kwargs.pop("category_id", None)
        category = Category.get_by_id(category_id)

        if category is None:
            raise errors.NotFound()

        kwargs["category"] = category

        return f(**kwargs)

    return wrapper


def check_item_exist(f):
    """
    Check if the item exists from the parameter item_id,
    and load the item into the argument `item`
    """

    @wraps(f)
    def wrapper(**kwargs):
        item_id = kwargs.pop("item_id", None)
        item = Item.get_by_id(item_id)

        if item is None:
            raise errors.NotFound()

        kwargs["item"] = item

        return f(**kwargs)

    return wrapper

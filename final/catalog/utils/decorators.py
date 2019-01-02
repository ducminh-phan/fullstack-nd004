from functools import wraps

import werkzeug.exceptions
from flask import request

from catalog import errors


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

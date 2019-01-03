from flask import jsonify
from marshmallow import fields, Schema


class Error(Exception):
    def __init__(self, status_code, error_message):
        super(Error, self).__init__()

        self.status_code = status_code
        self.error_message = error_message or {}

    def to_response(self):
        resp = jsonify(ErrorSchema().dump(self).data)
        resp.status_code = self.status_code
        return resp


class ErrorSchema(Schema):
    error_message = fields.String()


class StatusCode:
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    METHOD_NOT_ALLOWED = 405
    CONFLICT = 409
    INTERNAL_SERVER_ERROR = 500


def error_handler(e):
    return e.to_response()


class BadRequest(Error):
    def __init__(self, error_message="Bad Request"):
        super(BadRequest, self).__init__(StatusCode.BAD_REQUEST, error_message)


class Unauthorized(Error):
    def __init__(self, error_message="Unauthorized"):
        super(Unauthorized, self).__init__(StatusCode.UNAUTHORIZED, error_message)


class NotFound(Error):
    def __init__(self, error_message="Not Found"):
        super(NotFound, self).__init__(StatusCode.NOT_FOUND, error_message)


class Conflict(Error):
    def __init__(self, error_message="Conflict"):
        super(Conflict, self).__init__(StatusCode.CONFLICT, error_message)

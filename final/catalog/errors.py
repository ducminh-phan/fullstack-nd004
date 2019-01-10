from marshmallow import fields

from catalog.schemas.base import JsonifySchema


class Error(Exception):
    def __init__(self, status_code, message):
        super(Error, self).__init__()

        self.status_code = status_code
        self.message = message or {}

    def to_response(self):
        resp = ErrorSchema().jsonify(self)
        resp.status_code = self.status_code
        return resp


class ErrorSchema(JsonifySchema):
    message = fields.String()


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
    def __init__(self, message="Bad Request"):
        super(BadRequest, self).__init__(StatusCode.BAD_REQUEST, message)


class Unauthorized(Error):
    def __init__(self, message="Unauthorized"):
        super(Unauthorized, self).__init__(StatusCode.UNAUTHORIZED, message)


class Forbidden(Error):
    def __init__(self, message="Forbidden"):
        super(Forbidden, self).__init__(StatusCode.FORBIDDEN, message)


class NotFound(Error):
    def __init__(self, message="Not Found"):
        super(NotFound, self).__init__(StatusCode.NOT_FOUND, message)


class Conflict(Error):
    def __init__(self, message="Conflict"):
        super(Conflict, self).__init__(StatusCode.CONFLICT, message)

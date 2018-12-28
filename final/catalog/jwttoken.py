import jwt
from marshmallow import fields

from catalog.config import config
from catalog.schemas import BaseSchema


class AccessTokenSchema(BaseSchema):
    access_token = fields.String()


access_token_schema = AccessTokenSchema()


def encode(user):
    return jwt.encode({"user_id": user.id}, config.JWT_SECRET)


def decode(access_token):
    try:
        token = jwt.decode(access_token, config.JWT_SECRET)
    except jwt.InvalidTokenError:
        return None
    return token

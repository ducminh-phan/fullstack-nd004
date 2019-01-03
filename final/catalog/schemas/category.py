from marshmallow import Schema, fields

from catalog.schemas.base import JsonifySchema
from catalog.schemas.user import UserSchema


class CategorySchema(JsonifySchema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)

    user = fields.Nested(UserSchema, only=["id"])


class NewCategorySchema(Schema):
    name = fields.String(required=True)

from marshmallow import Schema, fields

from catalog.schemas.base import JsonifySchema
from catalog.schemas.category import CategorySchema
from catalog.schemas.user import UserSchema


class ItemSchema(JsonifySchema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)

    user = fields.Nested(UserSchema, only=["id"])
    category = fields.Nested(CategorySchema)


class NewItemSchema(Schema):
    name = fields.String(required=True)
    description = fields.String(required=True)

from marshmallow import Schema, fields

from catalog.schemas.category import CategorySchema
from catalog.schemas.user import UserSchema


class ItemSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)

    user = fields.Nested(UserSchema())
    category = fields.Nested(CategorySchema())

from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Integer(required=True)
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)


class CategorySchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)


class ItemSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)

    user = fields.Nested(UserSchema())
    category = fields.Nested(CategorySchema())

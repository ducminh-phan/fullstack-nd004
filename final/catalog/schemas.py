from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Integer()
    username = fields.String()
    email = fields.Email()
    password = fields.String()


class CategorySchema(Schema):
    id = fields.Integer()
    name = fields.String()


class ItemSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    description = fields.String()

    user = fields.Nested(UserSchema())
    category = fields.Nested(CategorySchema())

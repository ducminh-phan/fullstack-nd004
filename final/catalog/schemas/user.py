from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Integer()
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    access_token_nonce = fields.String()


class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)

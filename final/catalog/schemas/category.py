from marshmallow import Schema, fields


class CategorySchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)


class NewCategorySchema(Schema):
    name = fields.String(required=True)

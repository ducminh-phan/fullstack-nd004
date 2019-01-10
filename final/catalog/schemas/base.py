from flask import jsonify
from marshmallow import Schema


class JsonifySchema(Schema):
    def jsonify(self, obj, many=False):
        return jsonify(self.dump(obj, many).data)

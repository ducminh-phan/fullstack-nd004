from flask_login import UserMixin

from catalog.extensions import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)


class Item(db.Model):
    __table_args__ = (db.UniqueConstraint("category_id", "name"),)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(250))

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship(User)

    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    category = db.relationship(Category)

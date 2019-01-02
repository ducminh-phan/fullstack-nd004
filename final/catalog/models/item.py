from catalog.extensions import db
from catalog.models.category import Category
from catalog.models.user import User


class Item(db.Model):
    __table_args__ = (db.UniqueConstraint("category_id", "name"),)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(250))

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship(User)

    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    category = db.relationship(Category)

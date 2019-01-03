from catalog.extensions import db
from catalog.models.category import Category
from catalog.models.user import User

db_session = db.session


class Item(db.Model):
    __table_args__ = (db.UniqueConstraint("category_id", "name"),)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(250))

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship(User)

    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    category = db.relationship(Category)

    @classmethod
    def get_all_by_category_id(cls, category_id):
        return cls.query.filter_by(category_id=category_id).all()

    @classmethod
    def get_by_id(cls, item_id):
        return cls.query.filter_by(id=item_id).first()

    @classmethod
    def get_by_name(cls, category_id, item_name):
        return cls.query.filter_by(category_id=category_id, name=item_name).first()

    def save_to_db(self):
        db_session.add(self)
        db_session.commit()

from catalog.extensions import db
from catalog.models.user import User

db_session = db.session


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship(User)

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, category_id):
        return cls.query.filter_by(id=category_id).first()

    @classmethod
    def get_by_name(cls, category_name):
        return cls.query.filter_by(name=category_name).first()

    def save_to_db(self):
        db_session.add(self)
        db_session.commit()

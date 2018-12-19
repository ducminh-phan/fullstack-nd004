from typing import Optional

from .models import User
from .extensions import db

db_session = db.session


def get_user_by_email(email: str) -> Optional[User]:
    user = User.query.filter_by(email=email).first()
    return user


def get_user_by_username(username: str) -> Optional[User]:
    user = User.query.filter_by(username=username).first()
    return user


def add_user(user: User):
    db_session.add(user)
    db_session.commit()


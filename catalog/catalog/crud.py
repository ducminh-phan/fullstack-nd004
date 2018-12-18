from typing import Optional

from .extensions import db, login_manager
from .models import User

db_session = db.session


@login_manager.user_loader
def get_user_by_id(user_id: int) -> Optional[User]:
    user = User.query.filter_by(id=user_id).first()
    return user


def get_user_by_email(email: str) -> Optional[User]:
    user = User.query.filter_by(email=email).first()
    return user


def get_user_by_username(username: str) -> Optional[User]:
    user = User.query.filter_by(username=username).first()
    return user


def add_user(username: str, password: str, email: str) -> User:
    user = User(username=username, password=password, email=email)
    db_session.add(user)
    db_session.commit()

    return user

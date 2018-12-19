from typing import List, Optional

from .extensions import db
from .models import User, Category, Item

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


def get_all_categories() -> List[Category]:
    return Category.query.order_by(Category.id).all()


def get_category(name: str) -> Optional[Category]:
    cat = Category.query.filter_by(name=name).first()
    return cat


def add_category(category: Category):
    db_session.add(category)
    db_session.commit()


def get_all_items() -> List[Item]:
    return Item.query.order_by(Item.id).all()


def get_items_by_category(category: Category) -> List[Item]:
    return Item.query.order_by(Item.id).filter_by(category_id=category.id).all()


def get_item(category: Category, item_name: str) -> Optional[Item]:
    return Item.query.filter_by(category_id=category.id, name=item_name).first()


def add_item(item: Item):
    db_session.add(item)
    db_session.commit()

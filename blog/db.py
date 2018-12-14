from sqlite3 import Row
from typing import Optional, List

from .db_helpers import get_db


def get_user_by_id(user_id: int) -> Optional[Row]:
    return get_db().execute("SELECT * FROM user WHERE id = ?", (user_id,)).fetchone()


def get_user_by_username(username: str) -> Optional[Row]:
    return (
        get_db()
        .execute("SELECT * FROM user WHERE username = ?", (username,))
        .fetchone()
    )


def get_all_posts() -> List[Row]:
    return (
        get_db()
        .execute(
            "SELECT p.id, title, body, created, author_id, username "
            "FROM post p JOIN user u ON p.author_id = u.id "
            "ORDER BY created DESC"
        )
        .fetchall()
    )


def add_user(username: str, password: str) -> None:
    db = get_db()
    db.execute(
        "INSERT INTO user (username, password) VALUES (?, ?)", (username, password)
    )
    db.commit()


def add_post(title: str, body: str, author_id: int) -> None:
    db = get_db()
    db.execute(
        "INSERT INTO post (title, body, author_id)" " VALUES (?, ?, ?)",
        (title, body, author_id),
    )
    db.commit()

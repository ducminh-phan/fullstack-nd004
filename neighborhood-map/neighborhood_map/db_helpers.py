import click
import pymysql
from flask import g
from flask.cli import with_appcontext

from instance.config import DBConfig


def get_db():
    if "db" not in g:
        g.db = pymysql.connect(
            host=DBConfig.HOST,
            user=DBConfig.USER,
            password=DBConfig.PASSWORD,
            db="neighborhood_map",
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor,
        )

    return g.db


def close_db(_):
    db = g.pop("db", None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with open("schema.sql") as f, db.cursor() as c:
        sql = f.read()

        for x in sql.split(";"):
            cmd = x.strip()
            if cmd:
                c.execute(cmd)


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

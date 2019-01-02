from __future__ import print_function

import os
import sys

import pytest

from catalog import create_app
from catalog.extensions import db
from catalog.models.user import User

if os.getenv("ENVIRONMENT") != "test":
    print('Tests should be run with "ENVIRONMENT=test"')
    sys.exit(1)

# Read SQL for populating test data
with open(os.path.join(os.path.dirname(__file__), "dump.sql"), "rb") as f:
    _data_sql = f.read().decode("utf8")


@pytest.fixture(scope="session", autouse=True)
def app():
    app = create_app()

    with app.app_context():
        db.engine.execute(_data_sql)

    yield app

    with app.app_context():
        db.drop_all()

    db.session.remove()


@pytest.fixture(scope="session", autouse=True)
def client(app):
    return app.test_client()


@pytest.fixture(scope="session", autouse=True)
def user(app):
    with app.app_context():
        yield User.get_by_id(1)

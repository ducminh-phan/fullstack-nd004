import os

from flask import Flask

from instance.config import DBConfig, SECRET_KEY

from .extensions import db, login_manager


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=SECRET_KEY,
        SQLALCHEMY_DATABASE_URI="mysql://{}:{}@{}:{}/catalog".format(
            DBConfig.USERNAME, DBConfig.PASSWORD, DBConfig.HOST, DBConfig.PORT
        ),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    register_extensions(app)

    return app


def register_extensions(app):
    db.init_app(app)

    login_manager.init_app(app)


app = create_app()

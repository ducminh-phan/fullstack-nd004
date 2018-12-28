import os

from flask import Flask

from catalog.config import config
from catalog.extensions import db, login_manager


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=config.SECRET_KEY,
        SQLALCHEMY_DATABASE_URI="mysql+pymysql://{}:{}@{}:{}/catalog".format(
            config.DB.USERNAME, config.DB.PASSWORD, config.DB.HOST, config.DB.PORT
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


# Register these in their own function so they don't pollute the main namespace
# Loading these here lets allows the controllers/errors to execute their hooks
# to create the routes
def _register_subpackages():
    import catalog.errors


app = create_app()
_register_subpackages()

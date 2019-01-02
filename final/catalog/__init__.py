import os

from flask import Flask

from catalog.config import config
from catalog.extensions import db


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    register_extensions(app)

    return app


def register_extensions(app):
    db.init_app(app)


# Register these in their own function so they don't pollute the main namespace
# Loading these here lets allows the controllers/errors to execute their hooks
# to create the routes
def _register_subpackages():
    import catalog.controllers
    import catalog.errors


app = create_app()
_register_subpackages()

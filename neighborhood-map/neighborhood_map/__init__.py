import os

from flask import Flask

from .api import api_bp
from .static import static_bp


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_url_path="")
    app.config.from_mapping(SECRET_KEY="dev")

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

    from .db_helpers import init_app

    init_app(app)

    register_blueprints(app)

    return app


def register_blueprints(app):
    app.register_blueprint(static_bp)
    app.register_blueprint(api_bp)


app = create_app()

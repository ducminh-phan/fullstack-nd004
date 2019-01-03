import os

from flask import Flask

from catalog.config import config


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    register_extensions(app)
    register_blueprints(app)
    register_error_handler(app)

    return app


def register_extensions(app):
    from catalog.extensions import db
    import catalog.models

    db.init_app(app)

    with app.app_context():
        db.create_all()


def register_blueprints(app):
    from catalog.controllers.auth import auth_bp
    from catalog.controllers.category import category_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(category_bp)


def register_error_handler(app):
    from catalog.errors import Error, error_handler

    app.register_error_handler(Error, error_handler)

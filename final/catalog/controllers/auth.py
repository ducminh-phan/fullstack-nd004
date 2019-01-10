from flask import Blueprint
from google.auth.transport import requests
from google.oauth2 import id_token
from marshmallow import fields, Schema
from werkzeug.security import check_password_hash

from catalog import errors
from catalog.config import config
from catalog.extensions import db
from catalog.jwttoken import encode, generate_access_token_nonce
from catalog.models.user import User
from catalog.schemas.base import JsonifySchema
from catalog.schemas.user import UserLoginSchema
from catalog.utils.decorators import parse_args_with

INVALID_LOGIN_MESSAGE = "Invalid user login, please re-check your login credentials."
db_session = db.session
auth_bp = Blueprint("auth", __name__)


class AuthResponseSchema(JsonifySchema):
    access_token = fields.String()
    user_id = fields.Integer()
    username = fields.String()
    auth_type = fields.String()


auth_response_schema = AuthResponseSchema()


class GoogleAuthSchema(Schema):
    token = fields.Str(required=True, validate=lambda token: len(token) > 0)


def _change_user_nonce(user):
    """Generate new nonce for the user"""
    nonce = generate_access_token_nonce()
    user.access_token_nonce = nonce

    db_session.add(user)
    db_session.commit()


@auth_bp.route("/login", methods=("POST",))
@parse_args_with(UserLoginSchema())
def login(args):
    email = args.get("email")
    password = args.get("password")

    user = User.get_by_email(email)

    # Check if the user exists and the password is correct
    if user is None or not check_password_hash(user.password, password):
        raise errors.BadRequest(INVALID_LOGIN_MESSAGE)

    # Generate new nonce for the user to prevent replay attack
    _change_user_nonce(user)

    return auth_response_schema.jsonify(
        {
            "access_token": encode(user),
            "user_id": user.id,
            "username": user.username,
            "auth_type": "email",
        }
    )


@auth_bp.route("/login/google", methods=("POST",))
@parse_args_with(GoogleAuthSchema())
def google_auth(args):
    # Get user info from id token
    try:
        token = args["token"]
        user_info = id_token.verify_oauth2_token(
            token, requests.Request(), config.GOOGLE_OAUTH_CLIENT_ID
        )

        if user_info["iss"] not in [
            "accounts.google.com",
            "https://accounts.google.com",
        ]:
            return errors.BadRequest()
    except ValueError:
        raise errors.BadRequest()

    # Check if the user exists
    email = user_info["email"]
    user = User.get_by_email(email)

    if user is None:
        raise errors.BadRequest()

    _change_user_nonce(user)

    return auth_response_schema.jsonify(
        {
            "access_token": encode(user),
            "user_id": user.id,
            "username": user.username,
            "auth_type": "google",
        }
    )

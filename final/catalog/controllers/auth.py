from flask import Blueprint
from werkzeug.security import check_password_hash

from catalog.errors import BadRequest
from catalog.extensions import db
from catalog.jwttoken import access_token_schema, encode, generate_access_token_nonce
from catalog.models import User
from catalog.schemas import UserLoginSchema
from catalog.utils.decorators import parse_args_with

INVALID_LOGIN_MESSAGE = "Invalid user login, please re-check your login credentials."
db_session = db.session
auth_bp = Blueprint("auth", __name__)


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

    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if user is None or not check_password_hash(user.password, password):
        raise BadRequest(INVALID_LOGIN_MESSAGE)

    # Generate new nonce for the user to prevent replay attack
    _change_user_nonce(user)

    return access_token_schema.jsonify({"access_token": encode(user)})

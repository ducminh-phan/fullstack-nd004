from werkzeug.security import check_password_hash

from catalog import app
from catalog.errors import BadRequest
from catalog.jwttoken import access_token_schema, encode
from catalog.models import User
from catalog.schemas import UserLoginSchema
from catalog.utils.decorators import parse_args_with

INVALID_LOGIN_MESSAGE = "Invalid user login, please re-check your login credentials."


@app.route("/login", methods=("POST",))
@parse_args_with(UserLoginSchema())
def login(args):
    email = args.get("email")
    password = args.get("password")

    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if user is None or not check_password_hash(user.password, password):
        raise BadRequest(INVALID_LOGIN_MESSAGE)

    return access_token_schema.jsonify({"access_token": encode(user)})

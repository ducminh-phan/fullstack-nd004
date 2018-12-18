from flask import Blueprint, render_template, redirect, request, flash, abort
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from .crud import get_user_by_username, get_user_by_email, add_user
from .oauth import get_email_from_oauth
from .utils import is_safe_url

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/")
def index():
    return render_template("index.html")


@auth_bp.route("/login", methods=("GET", "POST"))
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        error = None
        user = get_user_by_username(username)

        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user.password, password):
            error = "Incorrect password."

        if error is None:
            login_user(user)

            next_redirect = request.args.get("next")

            # is_safe_url should check if the url is safe for redirects
            # http://flask.pocoo.org/snippets/62/
            if not is_safe_url(next_redirect):
                return abort(400)

            return redirect(next_redirect or "/")

        flash(error)

    return render_template("login.html")


@auth_bp.route("/register", methods=("GET", "POST"))
def register():
    if request.method == "GET":
        user_email = get_email_from_oauth()
        user = get_user_by_email(user_email)

        # Register the user if does not exist in the database yet,
        # otherwise, redirect to the index page
        if not user:
            return render_template("register.html", email=user_email)
        else:
            login_user(user)
            return redirect("/")

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")

        error = None

        if not username:
            error = "Username is required."
        elif not password:
            error = "Password is required."
        elif not email:
            error = "Email is required."
        elif get_user_by_username(username) is not None:
            error = f"User {username} is already registered."
        elif get_user_by_email(email) is not None:
            error = f"Email {email} is already registered."

        if error is None:
            user = add_user(username, generate_password_hash(password), email)
            login_user(user)

            return redirect("/")

        flash(error)

        return render_template("register.html")


@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()

    return redirect("/")

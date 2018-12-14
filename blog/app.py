import functools

from flask import request, flash, redirect, url_for, render_template, session, g
from werkzeug.security import check_password_hash, generate_password_hash

from . import create_app
from .db import get_user_by_id, get_all_posts, get_user_by_username, add_user, add_post

app = create_app()


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        # Redirect to login page if a user is not loaded
        if g.user is None:
            return redirect(url_for("login"))

        return view(**kwargs)

    return wrapped_view


@app.before_request
def load_logged_in_user():
    # Check if a user_id is stored in the session
    # and load the user into the global object g
    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = get_user_by_id(user_id)


@app.route("/")
def index():
    posts = get_all_posts()
    return render_template("index.html", posts=posts)


@app.route("/register", methods=("GET", "POST"))
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        error = None

        if not username:
            error = "Username is required."
        elif not password:
            error = "Password is required."
        elif get_user_by_username(username) is not None:
            error = f"User {username} is already registered."

        if error is None:
            add_user(username, generate_password_hash(password))
            return redirect(url_for("login"))

        flash(error)

    return render_template("register.html")


@app.route("/login", methods=("GET", "POST"))
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        error = None
        user = get_user_by_username(username)

        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user["password"], password):
            error = "Incorrect password."

        if error is None:
            session.clear()
            session["user_id"] = user["id"]
            return redirect(url_for("index"))

        flash(error)

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


@app.route("/create", methods=("GET", "POST"))
@login_required
def create():
    if request.method == "POST":
        title = request.form["title"]
        body = request.form["body"]
        error = None

        if not title:
            error = "Title is required."

        if error is not None:
            flash(error)
        else:
            add_post(title, body, g.user["id"])
            return redirect(url_for("index"))

    return render_template("create.html")


if __name__ == "__main__":
    app.run()

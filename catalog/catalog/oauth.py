from flask import current_app
from flask_dance.contrib.github import make_github_blueprint, github
from flask_dance.contrib.google import make_google_blueprint, google

from instance.config import GoogleOAuthConfig, GitHubOAuthConfig

google_bp = make_google_blueprint(
    client_id=GoogleOAuthConfig.CLIENT_ID,
    client_secret=GoogleOAuthConfig.CLIENT_SECRET,
    scope=["https://www.googleapis.com/auth/userinfo.email"],
    redirect_to="auth.register",
)

github_bp = make_github_blueprint(
    client_id=GitHubOAuthConfig.CLIENT_ID,
    client_secret=GitHubOAuthConfig.CLIENT_SECRET,
    scope=["user:email"],
    redirect_to="auth.register",
)


def get_email_from_oauth() -> str:
    user_email = ""

    try:
        resp = google.get("/plus/v1/people/me")
        user_email = resp.json()["emails"][0]["value"]
    except (IndexError, KeyError):
        pass

    try:
        resp = github.get("/user/emails")
        user_email = resp.json()[0]["email"]
    except (IndexError, KeyError):
        pass

    return user_email


def revoke_token():
    try:
        token = current_app.blueprints["google"].token["access_token"]
        google.post(
            "https://accounts.google.com/o/oauth2/revoke",
            params={"token": token},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
    except TypeError:
        pass

    try:
        token = current_app.blueprints["github"].token["access_token"]
        github.delete(
            "https://github.com/applications/{}/tokens/{}".format(
                GitHubOAuthConfig.CLIENT_ID, token
            )
        )
    except TypeError:
        pass

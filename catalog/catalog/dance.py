from flask_dance.contrib.google import make_google_blueprint

from instance.config import GoogleOAuthConfig

google_bp = make_google_blueprint(
    client_id=GoogleOAuthConfig.CLIENT_ID,
    client_secret=GoogleOAuthConfig.CLIENT_SECRET,
    scope=["https://www.googleapis.com/auth/userinfo.email"],
    redirect_to="auth.register",
)

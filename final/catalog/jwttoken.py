import os

import jwt

from catalog.config import config


def encode(user):
    return jwt.encode(
        {"user_id": user.id, "nonce": user.access_token_nonce}, config.JWT_SECRET
    )


def decode(access_token):
    try:
        token = jwt.decode(access_token, config.JWT_SECRET)
    except jwt.InvalidTokenError:
        return None
    return token


def generate_access_token_nonce():  # pragma: no cover
    return os.urandom(4).encode("hex")

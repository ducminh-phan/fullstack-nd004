from catalog.jwttoken import encode, decode


def test_encode_decode(user):
    encoded = encode(user)
    decoded = decode(encoded)

    assert decoded["nonce"] == user.access_token_nonce
    assert decoded["user_id"] == user.id


def test_decode():
    decoded = decode("zxc")
    assert decoded is None

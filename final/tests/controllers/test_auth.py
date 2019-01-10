def test_login_invalid_request(client):
    response = client.post("/login", json={})
    assert response.status_code == 400

    response = client.post("/login", json={"email": "zxc"})
    assert response.status_code == 400


def test_login_invalid_credentials(client):
    response = client.post("/login", json={"email": "zxc@gmail.com", "password": "zxc"})
    assert response.status_code == 400

    response = client.post("/login", json={"email": "zxc@gmail.com", "password": "zxc"})
    assert response.status_code == 400


def test_login_valid_credentials(client):
    response = client.post(
        "/login", json={"email": "zxc@gmail.com", "password": "zxcvbnm"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json

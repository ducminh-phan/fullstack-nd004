def test_login(client):
    # Invalid request
    response = client.post("/login", json={})
    assert response.status_code == 400

    response = client.post("/login", json={"email": "zxc"})
    assert response.status_code == 400

    # Invalid credentials
    response = client.post("/login", json={"email": "zxc@gmail.com", "password": "zxc"})
    assert response.status_code == 400

    response = client.post("/login", json={"email": "zxc@gmail.com", "password": "zxc"})
    assert response.status_code == 400

    # Valid credentials
    response = client.post(
        "/login", json={"email": "zxc@gmail.com", "password": "zxcvbnm"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json

import pytest
from flask import url_for


class TestNewCategory:
    @pytest.fixture(scope="class")
    def new_category_endpoint(self, app):
        with app.app_context():
            return url_for(endpoint="category.new_category")

    def test_new_category_invalid_token(self, client, new_category_endpoint):
        response = client.post(
            new_category_endpoint,
            headers={"Authorization": "random"},
            json={"name": "Cat 4"},
        )
        assert response.status_code == 401

    def test_new_category_invalid_json(self, client, new_category_endpoint, user_token):
        response = client.post(
            new_category_endpoint,
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={},
        )
        assert response.status_code == 400

    def test_new_category_conflict(self, client, new_category_endpoint, user_token):
        response = client.post(
            new_category_endpoint,
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={"name": "Cat 1"},
        )
        assert response.status_code == 409

    def test_new_category_success(self, client, new_category_endpoint, user_token):
        category_name = "New Category"

        response = client.post(
            new_category_endpoint,
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={"name": category_name},
        )
        assert response.status_code == 201
        assert response.json["name"] == category_name


class TestListCategories:
    @pytest.fixture(scope="class")
    def list_categories_endpoint(self, app):
        with app.app_context():
            return url_for(endpoint="category.list_categories")

    def test_list_categories(self, client, list_categories_endpoint):
        response = client.get(list_categories_endpoint)

        assert response.json


class TestGetCategory:
    @pytest.fixture(scope="class", params=[1, 2, 99])
    def get_category_endpoint(self, app, request):
        with app.app_context():
            return url_for(endpoint="category.get_category", category_id=request.param)

    def test_get_category(self, client, get_category_endpoint):
        response = client.get(get_category_endpoint)

        if "99" in get_category_endpoint:
            assert response.status_code == 404
        else:
            assert response.status_code == 200

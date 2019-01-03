import pytest
from flask import url_for


class TestNewItem:
    @pytest.fixture(scope="class")
    def new_item_endpoint(self, app):
        with app.app_context():
            return url_for(endpoint="item.new_item", category_id=1)

    def test_new_item_invalid_endpoint(self, client, user_token):
        response = client.post(
            url_for(endpoint="item.new_item", category_id=9),
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={"name": "Item 4", "description": ""},
        )
        assert response.status_code == 404

    def test_new_item_invalid_token(self, client, new_item_endpoint):
        response = client.post(
            new_item_endpoint,
            headers={"Authorization": "random"},
            json={"name": "Item 4", "description": ""},
        )
        assert response.status_code == 401

    def test_new_category_invalid_json(self, client, new_item_endpoint, user_token):
        response = client.post(
            new_item_endpoint,
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={},
        )
        assert response.status_code == 400

    def test_new_item_conflict(self, client, new_item_endpoint, user_token):
        response = client.post(
            new_item_endpoint,
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={"name": "Item 1", "description": ""},
        )
        assert response.status_code == 409

    def test_new_item_success(self, client, new_item_endpoint, user_token):
        item_name = "New Item"

        response = client.post(
            new_item_endpoint,
            headers={"Authorization": "Bearer {}".format(user_token)},
            json={"name": item_name, "description": ""},
        )
        assert response.status_code == 201
        assert response.json["name"] == item_name
        assert response.json["category"]["id"] == 1


class TestListItems:
    @pytest.fixture(scope="class", params=[1, 2])
    def list_items_endpoint(self, app, request):
        with app.app_context():
            return url_for(endpoint="item.list_items", category_id=request.param)

    def test_list_items_invalid_endpoint(self, client):
        response = client.get(url_for(endpoint="item.list_items", category_id=9))
        assert response.status_code == 404

    def test_list_categories(self, client, list_items_endpoint):
        response = client.get(list_items_endpoint)

        # Category #1 contains items, while category #2 does not contain any
        if "1" in list_items_endpoint:
            assert response.json
        if "2" in list_items_endpoint:
            assert not response.json


class TestGetCategory:
    def test_get_item_invalid_endpoint(self, client):
        for cid in [1, 9]:
            for iid in [1, 9]:
                if cid != 1 or iid != 1:
                    response = client.get(
                        url_for(endpoint="item.get_item", category_id=cid, item_id=iid)
                    )
                    assert response.status_code == 404

    def test_get_item_invalid_pair(self, client):
        response = client.get(
            url_for(endpoint="item.get_item", category_id=1, item_id=2)
        )
        assert response.status_code == 400

        response = client.get(
            url_for(endpoint="item.get_item", category_id=2, item_id=1)
        )
        assert response.status_code == 400

    def test_get_item(self, client):
        response = client.get(
            url_for(endpoint="item.get_item", category_id=1, item_id=1)
        )
        assert response.status_code == 200

        response = client.get(
            url_for(endpoint="item.get_item", category_id=3, item_id=2)
        )
        assert response.status_code == 200

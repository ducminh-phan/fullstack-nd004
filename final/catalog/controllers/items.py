from flask import Blueprint

from catalog.models.item import Item
from catalog.schemas.item import ItemSchema

items_bp = Blueprint("items", __name__, url_prefix="/items")


@items_bp.route("", methods=("GET",))
def list_items():
    items = Item.get_latests()

    return ItemSchema().jsonify(items, many=True)

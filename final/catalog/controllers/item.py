from flask import Blueprint, jsonify

from catalog import errors
from catalog.models.item import Item
from catalog.schemas.item import ItemSchema, NewItemSchema
from catalog.utils.decorators import (
    parse_args_with,
    require_logged_in,
    require_owner,
    check_category_exist,
    check_item_exist,
)

item_bp = Blueprint("item", __name__, url_prefix="/categories/<int:category_id>/items")


@item_bp.route("", methods=("POST",))
@parse_args_with(NewItemSchema())
@check_category_exist
@require_logged_in
def new_item(category, args, user):
    # For each category, the name of an item is unique, we need to check
    # if an item already exists with the given name
    if Item.get_by_name(category.id, args["name"]) is not None:
        raise errors.Conflict("Item already exists")

    item = Item(
        name=args["name"], description=args["description"], category=category, user=user
    )
    item.save_to_db()

    return ItemSchema().jsonify(item), 201


@item_bp.route("", methods=("GET",))
@check_category_exist
def list_items(category):
    items = Item.get_all_by_category_id(category.id)

    return ItemSchema().jsonify(items, many=True)


@item_bp.route("/<int:item_id>", methods=("GET",))
@check_category_exist
@check_item_exist
def get_item(category, item):
    # The category of the item should match the given category
    if item.category != category:
        raise errors.BadRequest()

    return ItemSchema().jsonify(item)


@item_bp.route("/<int:item_id>", methods=("DELETE",))
@check_category_exist
@check_item_exist
@require_logged_in
@require_owner
def delete_item(category, item, user):
    # The category of the item should match the given category
    if item.category != category:
        raise errors.BadRequest()

    return jsonify({}), 204

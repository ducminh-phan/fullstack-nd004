from flask import Blueprint, render_template, request, flash, abort
from flask_login import login_required, current_user

from .crud import (
    get_category,
    get_all_categories,
    add_category,
    get_item,
    add_item,
    get_items_by_category,
)
from .models import Category, Item

catalog_bp = Blueprint("catalog", __name__)


@catalog_bp.route("/add", methods=("GET", "POST"))
@login_required
def add():
    if request.method == "POST":
        item_name = request.form.get("item-name")
        description = request.form.get("item-description", "")
        category_name = request.form.get("category")

        error = None

        if item_name is None:
            error = "Item name is required."
        elif category_name is None:
            error = "A category is required."

        if error is None:
            category = get_category(category_name)

            if category is None:
                category = Category(name=category_name)
                add_category(category)

            item = Item(
                name=item_name,
                description=description,
                user_id=current_user.id,
                category_id=category.id,
            )

            if get_item(category, item_name) is not None:
                flash("Item already existed")
            else:
                add_item(item)
        else:
            flash(error)

    return render_template("add.html")


@catalog_bp.route("/<category_name>")
def show_category(category_name: str):
    category = get_category(category_name)

    if category is None:
        abort(404)

    items = get_items_by_category(category)

    all_categories = get_all_categories()

    return render_template(
        "category_items.html", categories=all_categories, category=category, items=items
    )


@catalog_bp.route("/<category_name>/<item_name>")
def show_item(category_name: str, item_name: str):
    category = get_category(category_name)

    if category is None:
        abort(404)

    item = get_item(category, item_name)

    if item is None:
        abort(404)

    return render_template("item.html", category=category, item=item)

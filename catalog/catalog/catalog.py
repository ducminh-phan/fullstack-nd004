from flask import Blueprint, render_template, request, abort, redirect
from flask_login import login_required, current_user

from .crud import (
    get_category,
    get_all_categories,
    add_item,
    update_item,
    get_items_by_category,
    delete_item,
)
from .models import Item
from .utils import check_item_exist, current_user_is_author, check_item_form

catalog_bp = Blueprint("catalog", __name__)


@catalog_bp.route("/add", methods=("GET", "POST"))
@login_required
def add():
    if request.method == "POST":
        form_ok, kwargs = check_item_form()

        if form_ok:
            kwargs["user_id"] = current_user.id
            item = Item(**kwargs)
            add_item(item)

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
@check_item_exist
def show_item(category_name: str, item_name: str, **kwargs):
    category = kwargs.get("category")
    item = kwargs.get("item")
    author = item.user

    return render_template(
        "item.html",
        category=category,
        item=item,
        authored=current_user_is_author(author),
    )


@catalog_bp.route("/<category_name>/<item_name>/edit", methods=("GET", "POST"))
@login_required
@check_item_exist
def edit(category_name: str, item_name: str, **kwargs):
    category = kwargs.get("category")
    item = kwargs.get("item")

    if category is None or item is None:
        abort(404)

    author = item.user
    if not current_user_is_author(author):
        abort(403)

    if request.method == "POST":
        form_ok, kwargs = check_item_form()

        if form_ok:
            kwargs["user_id"] = current_user.id
            update_item(item, kwargs)

    return render_template("edit.html", item=item)


@catalog_bp.route("/<category_name>/<item_name>/delete", methods=("GET", "POST"))
@login_required
@check_item_exist
def delete(category_name: str, item_name: str, **kwargs):
    category = kwargs.get("category")
    item = kwargs.get("item")

    if category is None or item is None:
        abort(404)

    author = item.user
    if not current_user_is_author(author):
        abort(403)

    if request.method == "POST":
        delete_item(item)
        return redirect("/")

    return render_template("delete.html", item=item)

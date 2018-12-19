from flask import Blueprint, render_template, request, flash
from flask_login import login_required, current_user

from .crud import get_category, add_category, add_item
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
            add_item(item)
        else:
            flash(error)

    return render_template("add.html")

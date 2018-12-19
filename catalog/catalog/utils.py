from functools import wraps
from urllib.parse import urlparse, urljoin

from flask import request, abort, flash
from flask_login import current_user

from .crud import get_category, get_item, add_category
from .models import Category


def is_safe_url(target):
    ref_url = urlparse(request.host_url)
    test_url = urlparse(urljoin(request.host_url, target))

    return test_url.scheme in ("http", "https") and ref_url.netloc == test_url.netloc


def check_user(user_id: int):
    if user_id != current_user.id:
        abort(403)


def check_item_exist(view):
    @wraps(view)
    def wrapper(**kwargs):
        category_name = kwargs.get("category_name")
        category = None
        item = None

        if category_name is not None:
            category = get_category(category_name)

            if category is None:
                abort(404)

        item_name = kwargs.get("item_name")

        if item_name is not None:
            item = get_item(category, item_name)

            if item is None:
                abort(404)

        kwargs["category"] = category
        kwargs["item"] = item

        return view(**kwargs)

    return wrapper


def check_item_form():
    """
    Check if the item form from add and edit views is ok. Return a boolean value
    indicates whether there is no error with the form, and a dict representing
    the values obtain from the form.
    """
    item_name = request.form.get("item-name")
    description = request.form.get("item-description", "")
    category_name = request.form.get("category")

    kwargs = {"description": description}

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

        if get_item(category, item_name) is not None:
            error = "Item already existed"
        else:
            kwargs["name"] = item_name
            kwargs["category_id"] = category.id

    if error is not None:
        flash(error)

    return error is None, kwargs

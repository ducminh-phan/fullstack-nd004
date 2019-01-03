from flask import Blueprint

from catalog import errors
from catalog.models.category import Category
from catalog.schemas.category import CategorySchema, NewCategorySchema
from catalog.utils.decorators import parse_args_with, require_logged_in

category_bp = Blueprint("category", __name__, url_prefix="/categories")


@category_bp.route("", methods=("POST",))
@parse_args_with(NewCategorySchema())
@require_logged_in
def new_category(args, user):
    category = Category(name=args["name"], user=user)

    # The name of a category is unique, we need to check if a category
    # already exists with the given name
    if Category.get_by_name(args["name"]) is not None:
        raise errors.Conflict("Category already exists")

    category.save_to_db()

    return CategorySchema().jsonify(category), 201


@category_bp.route("", methods=("GET",))
def list_categories():
    categories = Category.get_all()

    return CategorySchema().jsonify(categories, many=True)


@category_bp.route("/<int:category_id>", methods=["GET"])
def get_category(category_id):
    category = Category.get_by_id(category_id)

    if category is None:
        raise errors.NotFound()

    return CategorySchema().jsonify(category)

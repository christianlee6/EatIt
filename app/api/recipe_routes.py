from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe
from app.forms.recipe_form import RecipeForm
import app.utilities as util

recipe_routes = Blueprint("recipes", __name__)

@recipe_routes.route("/")
def all_recipes():
    """
    Query for all recipes
    """

    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route("/<int:recipe_id>")
def single_recipe(recipe_id):
    """
    Query for a single recipe
    """

    recipe = Recipe.query.get(recipe_id)
    return recipe.to_dict()

@recipe_routes.route("", methods=["POST"])
@login_required
def create_recipe():
    """
    Create a new recipe
    """

    form = RecipeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    if form.validate_on_submit():
        recipe = Recipe(
            name = data["name"],
            description = data["description"],
            cuisine = data["cuisine"],
            difficulty = data["difficulty"],
            prep_time = data["prep_time"],
            preview_img = data["preview_img"],
            instructions = data["instructions"],
            created_at = data["created_at"],
            updated_at = None
        )

        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict()

    return {"errors": util.validation_errors_to_error_messages(form.errors) }

@recipe_routes.route("/<int:recipe_id>", methods=["PUT"])
@login_required
def edit_recipe(recipe_id):
    """
    Edit the details of a recipe
    """
    recipe = Recipe.query.get(recipe_id)
    form = RecipeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    if form.validate_on_submit():
        recipe.name = data["name"],
        recipe.description = data["description"],
        recipe.cuisine = data["cuisine"],
        recipe.difficulty = data["difficulty"],
        recipe.prep_time = data["prep_time"],
        recipe.preview_img = data["preview_img"],
        recipe.instructions = data["instruction"],
        recipe.updated_at = data["updated_at"]

        db.session.commit()
        return recipe.to_dict()
    return {"errors": util.validation_errors_to_error_messages(form.errors) }

@recipe_routes.route("/<int:recipe_id>", methods=["DELETE"])
@login_required
def delete_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)

    if recipe is None:
        return {"error": f"Could not find recipe with id {recipe_id}"}

    db.session.delete(recipe)
    db.session.commit()
    return {"success": "True", "status_code": 200}

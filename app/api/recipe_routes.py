from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, Review, User
from app.forms.recipe_form import RecipeForm
import app.utilities as util

recipe_routes = Blueprint("recipes", __name__)

@recipe_routes.route("/")
def all_recipes():
    """
    Query for all recipes
    """

    recipes = Recipe.query.all()


    recipesList = [recipe.to_dict() for recipe in recipes]

    for recipe in recipesList:
        print(f"\n\n\n\n recipe", recipe)

        # user = User.query.get(recipe["creator_id"]).to_dict()
        # recipe["creator"] = user

        reviews = db.session.execute(db.select(Review).filter_by(recipe_id = recipe["id"])).all()


        reviewsList = [review[0].to_dict() for review in reviews]
        print(f"\n\n\n reviewsList", len(reviewsList))


        sum = 0
        for review in reviewsList:
            print(f"\n\n\n\n review", review)
            sum += review["rating"]
            print(f"\n\n\n\n sum", sum)

        num_reviews = len(reviewsList)
        print(f"\n\n\n\n num_reviews", num_reviews)
        if num_reviews == 0:
            avg = 100
        else:
            avg = sum / num_reviews


        recipe["avg_rating"] = avg

    return {"recipes": [recipe for recipe in recipesList]}

@recipe_routes.route("/<int:recipe_id>")
def single_recipe(recipe_id):
    """
    Query for a single recipe
    """

    recipe = Recipe.query.get(recipe_id).to_dict()
    # print(f"\n\n\n recipe", recipe)
    user = User.query.get(recipe["creator_id"]).to_dict()
    recipe["creator"] = user
    # print(f"\n\n\n user", user)
    return recipe

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
            creator_id = data["creator_id"],
            description = data["description"],
            cuisine = data["cuisine"],
            difficulty = data["difficulty"],
            prep_time = data["prep_time"],
            preview_img = data["preview_img"],
            instructions = data["instructions"],
            ingredients = data["ingredients"],
            servings = data["servings"],
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
        recipe.name = data["name"]
        recipe.creator_id = data["creator_id"]
        recipe.description = data["description"]
        recipe.cuisine = data["cuisine"]
        recipe.difficulty = data["difficulty"]
        recipe.prep_time = data["prep_time"]
        recipe.preview_img = data["preview_img"]
        recipe.instructions = data["instructions"]
        recipe.ingredients = data["ingredients"]
        recipe.servings = data["servings"]
        recipe.updated_at = data["updated_at"]

        db.session.commit()
        return recipe.to_dict()
    return {"errors": util.validation_errors_to_error_messages(form.errors) }

@recipe_routes.route("/<int:recipe_id>", methods=["DELETE"])
@login_required
def delete_recipe(recipe_id):
    """
    Delete a single recipe
    """
    recipe = Recipe.query.get_or_404(recipe_id)

    if recipe is None:
        return {"error": f"Could not find recipe with id {recipe_id}"}

    db.session.delete(recipe)
    db.session.commit()
    return {"success": "True", "status_code": 200}

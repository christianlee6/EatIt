from flask import Blueprint
from flask_login import login_required
from app.models import db, Recipe

recipe_routes = Blueprint("recipes", __name__)

@recipe_routes.route("/")

def all_recipes():
    """
    Query for all recipes
    """

    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}

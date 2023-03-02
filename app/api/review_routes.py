from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Review, User
from app.forms.review_form import ReviewForm

import app.utilities as util

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/<int:recipe_id>")
def all_reviews(recipe_id):
    """
    Query for all reviews of a single recipe
    """

    reviews = Review.query.filter_by(recipe_id = recipe_id)
    reviewsList = [review.to_dict() for review in reviews]

    for review in reviewsList:
        user = User.query.get(review["reviewer_id"])
        review["user"] = user.to_dict()
        # print(f"\n\n\n\n", review)

    return {"reviews": [review for review in reviewsList]}

@review_routes.route("", methods=["POST"])
@login_required
def create_review():
    """
    Create a new review for a recipe
    """

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    if form.validate_on_submit():
        review = Review(
            review = data["review"],
            rating = data["rating"],
            created_at = data["created_at"],
            updated_at = None
        )

        db.session.add(review)
        db.session.commit()
        return review.to_dict()

    return {"errors": util.validation_errors_to_error_messages(form.errors) }

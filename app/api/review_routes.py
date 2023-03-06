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

@review_routes.route("/<int:review_id>")
@login_required
def single_review(review_id):
    """
    Query for a single recipe
    """

    review = Review.query.get(review_id).to_dict()
    return review

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
        print(f"\n\n\n\n data[review]", data["review"])
        print(f"\n\n\n\n data[reviewer_id]", data["reviewer_id"])

        review = Review(
            reviewer_id = data["reviewer_id"],
            recipe_id = data["recipe_id"],
            review = data["review"],
            rating = data["rating"],
            created_at = data["created_at"],
            updated_at = None
        )
        print(f"\n\n\n\n review before", review.to_dict())
        db.session.add(review)
        db.session.commit()
        print(f"\n\n\n\n review after", review.to_dict())

        return review.to_dict()

    return {"errors": util.validation_errors_to_error_messages(form.errors) }

@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def edit_review(review_id):
    """
    Edit the details of a review
    """
    review = Review.query.get(review_id)
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    if form.validate_on_submit():
        review.recipe_id = data["recipe_id"]
        review.reviewer_id = data["reviewer_id"]
        review.review = data["review"]
        review.rating = data["rating"]
        review.created_at = data["created_at"]
        review.updated_at = data["updated_at"]

        db.session.commit()
        return review.to_dict()
    return {"errors": util.validation_errors_to_error_messages(form.errors) }

@review_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
    """
    Delete a single review
    """
    review = Review.query.get_or_404(review_id)

    if review is None:
        return {"error": f"Could not find recipe with id {review_id}"}

    db.session.delete(review)
    db.session.commit()
    return {"success": "True", "status_code": 200}

from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")))
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    reviewer = db.relationship("User", back_populates="reviews")
    recipe = db.relationship("Recipe", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "reviewer_id": self.reviewer_id,
            "recipe_id": self.recipe_id,
            "review": self.review,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
 
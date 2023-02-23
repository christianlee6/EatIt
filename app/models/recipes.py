from .db import db, environment, SCHEMA, add_prefix_for_prod

class Recipe(db.Model):
    __tablename__ = "recipes"

    if environment == "production":
        __table_args__ = {"schema: SCHEMA"}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    cuisine = db.Column(db.String, nullable=False)
    is_dessert = db.Column(db.Boolean, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    prep_time = db.Column(db.String, nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
    created_at = db.Column(db.String)

    creator = db.relationship("User", back_populates="recipes")
    ingredients = db.relationship("Ingredient", back_populates="recipe")
    reviews = db.relationship("Review", back_populates="recipe")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "cuisine": self.cuisine,
            "is_dessert": self.is_dessert,
            "difficulty": self.difficulty,
            "prep_time": self.prep_time,
            "preview_img": self.preview_img,
            "instructions": self.instructions,
            "created_at": self.created_at
        }

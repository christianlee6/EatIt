# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Ingredient(db.Model):
#     __tablename__ = "ingredients"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")))
#     ingredient = db.Column(db.String, nullable=False)

#     recipe = db.relationship("Recipe", back_populates="ingredients")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "recipe_id": self.recipe_id,
#             "ingredient": self.ingredient
#         }


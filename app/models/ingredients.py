from .db import db, environment, SCHEMA, add_prefix_for_prod

class Ingredient(db.Model):
    __tablename__ = "ingredients"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")))
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float(precision=2), nullable=False)
    unit = db.Column(db.String, nullable=False)

    recipe = db.relationship("Recipe", back_populates="ingredients")

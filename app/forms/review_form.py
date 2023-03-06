from flask_wtf import FlaskForm
from flask_login import current_user
import wtforms as wtf
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Review

class ReviewForm(FlaskForm):
    reviewer_id = wtf.IntegerField("Reviewer_id", validators=[DataRequired()])
    recipe_id = wtf.IntegerField("Recipe_id", validators=[DataRequired()])
    review = wtf.TextAreaField("Review", validators=[DataRequired(), Length(max=5000)])
    rating = wtf.IntegerField("Rating")
    created_at = wtf.StringField("Created At", validators=[DataRequired()])
    updated_at = wtf.StringField("Updated At")

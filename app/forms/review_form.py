from flask_wtf import FlaskForm
from flask_login import current_user
import wtforms as wtf
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Review

class ReviewForm(FlaskForm):
    review = wtf.TextAreaField("Review", validators=[DataRequired(), Length(max=5000)])
    rating = wtf.IntegerField("Rating", validators=[DataRequired()])
    created_at = wtf.StringField("Created At", validators=[DataRequired()])
    updated_at = wtf.StringField("Updated At")

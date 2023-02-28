from flask_wtf import FlaskForm
from flask_login import current_user
import wtforms as wtf
from wtforms.validators import DataRequired, ValidationError
from app.models import Recipe

def validate_name_len(form, field):
    name = field.data
    if len(name) > 50:
        raise ValidationError("Please enter a recipe name that is less than 50 characters.")

def validate_description_len(form, field):
    description = field.data
    if len(description) > 2500:
        raise ValidationError("Please enter a description that is less than 2500 characters.")

def validate_difficulty(form, field):
    difficulty = field.data
    if difficulty < 1 or difficulty > 5:
        raise ValidationError("Please enter a difficulty level that is between 1 and 5.")

def validate_prep_time(form, field):
    prep_time = field.data
    if prep_time > 240:
        raise ValidationError("Please enter a prep time that is 240 minutes or less.")

def validate_instructions_len(form, field):
    instructions = field.data
    if len(instructions) > 5000:
        raise ValidationError("Please enter instructions that are less than 5000 characters.")



class RecipeForm(FlaskForm):
    name = wtf.StringField("Name", validators=[DataRequired(), validate_name_len])
    description = wtf.StringField("Description", validators=[DataRequired(), validate_description_len])
    cuisine = wtf.StringField("Cuisine", validators=[DataRequired()])
    difficulty = wtf.IntegerField("Difficulty", validators=[DataRequired(), validate_difficulty])
    prep_time = wtf.IntegerField("Prep Time", validators=[DataRequired(), validate_prep_time])
    preview_img = wtf.URLField("Preview Image", validators=[DataRequired()])
    instructions = wtf.StringField("Instructions", validators=[DataRequired(), validate_instructions_len])
    created_at = wtf.StringField("Created At", validators=[DataRequired()])
    updated_at = wtf.StringField("Updated At")

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def validate_email(form, field):
    email = field.data
    if "@" not in email:
        raise ValidationError("Please enter a valid email")

def validate_email_length(form, field):
    email = field.data
    if len(email) > 320:
        raise ValidationError("Email must be less than 320 characters long")


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

def validate_first_name(form, field):
    first_name = field.data
    if len(first_name) > 50:
        raise ValidationError("First Name must be less than 25 characters long")

def validate_last_name(form, field):
    last_name = field.data
    if len(last_name) > 50:
        raise ValidationError("Last Name must be less than 25 characters long")


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), validate_first_name])
    last_name = StringField("Last Name", validators=[DataRequired(), validate_last_name])
    email = StringField('email', validators=[DataRequired(), user_exists, validate_email, validate_email_length])
    password = StringField('password', validators=[DataRequired()])

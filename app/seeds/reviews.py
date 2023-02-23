from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    review1 = Review(
        reviewer_id = 9,
        recipe_id = 1,
        review = "Yum! What a great recipe.",
        rating = 5,
        created_at = "2/1/23",
        updated_at = "2/1/23"
    ),
    review2 = Review(
        reviewer_id = 8,
        recipe_id = 2,
        review = "Ew! This recipe sucks!",
        rating = 2,
        created_at = "2/3/23",
        updated_at = "2/3/23"
    ),
    review3 = Review(
        reviewer_id = 7,
        recipe_id = 3,
        review = "Yum! What a great recipe.",
        rating = 4,
        created_at = "1/28/23",
        updated_at = "1/28/23"
    ),
    review4 = Review(
        reviewer_id = 6,
        recipe_id = 4,
        review = "Ew! This recipe sucks!",
        rating = 1,
        created_at = "2/10/23",
        updated_at = "2/10/23"
    ),
    review5 = Review(
        reviewer_id = 5,
        recipe_id = 5,
        review = "Yum! What a great recipe.",
        rating = 5,
        created_at = "2/11/23",
        updated_at = "2/11/23"
    ),
    review6 = Review(
        reviewer_id = 4,
        recipe_id = 6,
        review = "Ew! This recipe sucks!",
        rating = 3,
        created_at = "2/2/23",
        updated_at = "2/2/23"
    ),
    review7 = Review(
        reviewer_id = 3,
        recipe_id = 7,
        review = "Yum! What a great recipe.",
        rating = 5,
        created_at = "1/24/23",
        updated_at = "1/24/23"
    ),
    review8 = Review(
        reviewer_id = 2,
        recipe_id = 8,
        review = "Ew! This recipe sucks!",
        rating = 3,
        created_at = "2/5/23",
        updated_at = "2/5/23"
    ),
    review9 = Review(
        reviewer_id = 1,
        recipe_id = 9,
        review = "Yum! What a great recipe.",
        rating = 4,
        created_at = "2/17/23",
        updated_at = "2/17/23"
    ),
    review10 = Review(
        reviewer_id = 1,
        recipe_id = 10,
        review = "Ew! This recipe sucks!",
        rating = 1,
        created_at = "1/18/23",
        updated_at = "1/18/23"
    ),
    review11 = Review(
        reviewer_id = 5,
        recipe_id = 3,
        review = "Yum! What a great recipe.",
        rating = 4,
        created_at = "1/26/23",
        updated_at = "1/26/23"
    ),
    review12 = Review(
        reviewer_id = 7,
        recipe_id = 2,
        review = "Ew! This recipe sucks!",
        rating = 2,
        created_at = "1/30/23",
        updated_at = "1/30/23"
    ),
    review13 = Review(
        reviewer_id = 4,
        recipe_id = 8,
        review = "Yum! What a great recipe.",
        rating = 5,
        created_at = "2/8/23",
        updated_at = "2/8/23"
    ),
    review14 = Review(
        reviewer_id = 7,
        recipe_id = 10,
        review = "Ew! This recipe sucks!",
        rating = 3,
        created_at = "2/20/23",
        updated_at = "2/20/23"
    )

    all_reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipes")

    db.session.commit()

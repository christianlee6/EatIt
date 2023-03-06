from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="User", email='demo@aa.io', password='password')
    marnie = User(
        first_name="Marnie", last_name="Jones", email='marnie@aa.io', password='password')
    bobbie = User(
        first_name="Bobbie", last_name="Smith", email='bobbie@aa.io', password='password')
    chris = User(
        first_name="Chris", last_name="Kim", email='chris@aa.io', password='password')
    justin = User(
        first_name="Justin", last_name="Brown", email='justin@aa.io', password='password')
    sarah = User(
        first_name="Sarah", last_name="Wong", email='sarah@aa.io', password='password')
    jessie = User(
        first_name="Jessie", last_name="Kidd", email='jessie@aa.io', password='password')
    sam = User(
        first_name="Sam", last_name="Ingram", email="sam@aa.io", password='password')
    shannon = User(
        first_name="Shannon", last_name="Davis", email="shannon@aa.io", password="password")

    all_users = [demo, marnie, bobbie, chris, justin, sarah, jessie, sam, shannon]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

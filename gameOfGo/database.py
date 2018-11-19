from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class DUser(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=False)
    score = db.Column(db.Integer, unique=False)

    def __init__(self, username, password, email, score):
        self.username = username
        self.password = password
        self.email = email
        self.score = score

def register_db(app):
	with app.app_context():
		db.init_app(app)
		db.create_all()
from flask import Flask, render_template, request, flash, redirect
from flask_bootstrap import Bootstrap
from database import db, DUser, register_db
#from flask_login import LoginManager, login_user, login_required

app = Flask(__name__)
app.secret_key = 'some_secret'
app.config.from_object('config')
Bootstrap(app)
register_db(app)
#lm = LoginManager()
#lm.init_app(app)

@app.route('/')
def index():
    return render_template("login_and_register_tabbed_form.html")

@app.route('/submit', methods=['POST'])
def submit():
    username = request.form.get('username')
    password = request.form.get('password')

    user = DUser.query.filter_by(username=username).first()
    if not user:
        flash('Invalid User')
        return redirect('/')

    elif user and password != user.query.filter_by(username=username).first().password:
        flash('Incorrect password')
        return redirect('/')

    else:
        #login_user(user)
        return render_template('gamelobby.html')


@app.route('/create', methods=['POST'])
def create():
    usrname = request.form.get('usrname')
    print(usrname)
    pssword = request.form.get('pssword')
    print(pssword)
    confirm = request.form.get('confirm-password')
    print(confirm)
    email = request.form.get('email')
    print(email)

    if pssword == confirm:
        user = DUser(usrname, pssword, email, score=0)
        db.session.add(user)
        db.session.commit()

        flash('User has been successfully registered...Login!')
        return redirect('/')

    else:
        flash('Password was not confirmed')
        return redirect('/')


@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    if not DUser.query.all():
        return "There are no Users to put on the leaderboard"
    else:
        return render_template('leaderboard.html', user=DUser)

@app.route('/gamelobby')
def gamelobby():
    return render_template('gamelobby.html')


app.run(debug=True, host='0.0.0.0')

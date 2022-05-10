import flask
import src

@src.app.route('/', methods=['GET'])
def index():
    return flask.render_template('index.html')
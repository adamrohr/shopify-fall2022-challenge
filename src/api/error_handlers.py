import flask
import src
from .exceptions import *

@src.app.errorhandler(InvalidInput)
def handle_invalid_quantity(error):
    response = flask.jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

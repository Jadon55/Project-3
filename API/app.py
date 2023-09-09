from flask import Flask, jsonify, render_template
from data_collection import getAll, getYear
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
CORS(app)

# home page with routes
@app.route("/")
def index():
    return render_template('index.html')

# return all data from the database
@app.route("/api/v1.0")
def apiAll():
    return jsonify(getAll())

# return data for selected year from the database
@app.route("/api/v1.0/<year>")
def apiYear(year):
    # convert year to a int
    year = int(year)
    return jsonify(getYear(year))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

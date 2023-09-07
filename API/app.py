from flask import Flask, jsonify, render_template
from data_collection import test, getAll, getYear
import json


app = Flask(__name__)
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
    year = int(year)
    return jsonify(getYear(year))

# return all data from the locally saved data
@app.route("/api/saved")
def savedAll():
    with open("All-Presaved.json", "r") as file:
        data = json.load(file)
    return jsonify(data)
# return data for selected year from the locally saved data
@app.route("/api/saved/<year>")
def savedYear(year):
    with open("All-Presaved.json", "r") as file:
        data = json.load(file)
    filtered_data = [item for item in data if item.get("crashYear") == year]
    return jsonify(filtered_data)

if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True)
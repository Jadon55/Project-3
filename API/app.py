from flask import Flask, jsonify, render_template
from data_collection import test, getAll, getYear


app = Flask(__name__)
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/v1.0")
def apiAll():
    return jsonify(getAll())

@app.route("/api/v1.0/<year>")
def apiYear(year):
    year = int(year)
    return jsonify(getYear(year))

if __name__ == "__main__":
    app.run(debug=True)
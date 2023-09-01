from flask import Flask, jsonify, render_template
from data_collection import test

test()





# app = Flask(__name__)
# @app.route("/")
# def index():
#     return render_template('index.html')

# @app.route("/api/v1.0/<tabel>")
# def apitable(tabel):
#     return get_tabel(tabel)

# @app.route("/api/v1.0/<tabel>/<column>")
# def apicolumn(tabel, column):
#     return get_col(tabel, column)

# @app.route("/api/v1.0/<tabel>/<column>/<data>")
# def apimatch(tabel, column, data):
#     return get_match(tabel, column, data)

# if __name__ == "__main__":
#     app.run(debug=True)
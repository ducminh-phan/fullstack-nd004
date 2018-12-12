from flask import Flask, abort, render_template


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html", title="Portfolio")


@app.route("/<path>")
def serve(path):
    if path in ("about", "works"):
        return render_template(f"{path}.html", title=path.title())

    abort(404)

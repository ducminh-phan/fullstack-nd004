from flask import Blueprint, send_from_directory

static_bp = Blueprint("static", "__name__")


@static_bp.route("/")
def index():
    return send_from_directory("", "index.html")


@static_bp.route("/css/<path:path>")
def send_css(path):
    return send_from_directory("css", path)


@static_bp.route("/js/<path:path>")
def send_js(path):
    return send_from_directory("js", path)

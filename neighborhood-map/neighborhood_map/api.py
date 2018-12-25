import bleach
import requests
from flask import Blueprint, jsonify, abort

from instance.config import FoursquareConfig
from .db import get_place_by_id, get_all_places

api_bp = Blueprint("api", __name__)


@api_bp.route("/places")
def places():
    return jsonify(get_all_places())


@api_bp.route("/foursquare/<int:place_id>")
def nearby_restaurants(place_id: int):
    place = get_place_by_id(place_id)
    url = (
        f"https://api.foursquare.com/v2/venues/search?"
        f"client_id={FoursquareConfig.CLIENT_ID}"
        f"&client_secret={FoursquareConfig.CLIENT_SECRET}"
        f"&v=20130815&ll={place.lat},{place.lng}"
        f"&query=restaurant"
    )

    try:
        response = requests.get(url)

        return format_foursquare_response(response.json())
    except:
        abort(404)


def format_foursquare_response(response_dict):
    venues = response_dict["response"]["venues"]

    content = "<ul>\n{}\n</ul>".format(
        "\n".join(
            "    <li>{}</li>".format(bleach.clean(venues[i]["name"])) for i in range(5)
        )
    )

    return content

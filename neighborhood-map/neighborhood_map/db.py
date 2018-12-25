from typing import List

from .db_helpers import get_db


class Place(dict):
    def __init__(self, **kwargs):
        self.id: int = kwargs.get("id", 0)
        self.name: str = kwargs.get("name", "")
        self.lat: float = kwargs.get("lat", 0)
        self.lng: float = kwargs.get("lng", 0)

        super().__init__(
            {
                "id": self.id,
                "name": self.name,
                "coordinates": {"lat": self.lat, "lng": self.lng},
            }
        )


def get_place_by_id(place_id: int) -> Place:
    cursor = get_db().cursor()
    cursor.execute("SELECT * FROM place WHERE id = %s", (place_id,))

    return Place(**cursor.fetchone())


def get_all_places() -> List[Place]:
    cursor = get_db().cursor()
    cursor.execute("SELECT * FROM place")

    return list(map(lambda d: Place(**d), cursor.fetchall()))

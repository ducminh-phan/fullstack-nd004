let map, infoWindow;

function main() {
    initMap();

    // Get place models from json
    $.getJSON('/places', (places) => {
        places = makeVisibleObservable(places);

        let markers = createMarkers(places);

        ko.applyBindings(new AppViewModel(places, markers));
    });
}

function initMap() {
    // Center the map to Paris
    let paris_coordinates = {lat: 48.8583859, lng: 2.3417363};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: paris_coordinates
    });

    infoWindow = new google.maps.InfoWindow();
}

function makeVisibleObservable(data) {
    return data.map((place) => {
        place.visible = ko.observable(true);
        return place;
    });
}

function createMarkers(places) {
    let markers = [];

    for (let place of places) {
        let marker = new google.maps.Marker({
            position: place.coordinates,
            animation: google.maps.Animation.DROP,
            map: map,
            id: place.id
        });

        google.maps.event.addListener(marker, 'click', () => {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            openInfoWindow(marker, place);
        });
        markers.push(marker);
    }

    return markers;
}

// Open infoWindow with foursquare API
function openInfoWindow(marker, place) {
    if (infoWindow.marker !== marker) {
        // AJAX call to get the nearby restaurants
        $.get('/foursquare/' + place.id, function (data) {
            let content = '<h4>' + place.name + '</h4>' + '<p>Nearby Restaurants: </p>\n';
            content += data;

            infoWindow.marker = marker;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
            infoWindow.addListener('closeclick', () => {
                infoWindow.setMarker = null;
            });

            marker.setAnimation(null);
        }).fail(function () {
            alert('Failed to fetch nearby restaurants');
            marker.setAnimation(null);
        });
    }
}

function AppViewModel(places, markers) {
    let self = this;

    this.places = ko.observableArray(places);
    this.menuVisibility = ko.observable(false);

    this.filterInput = ko.observable('');
    this.handleFilter = ko.pureComputed(this.filterInput);

    // Show the markers/places list based on the filter
    this.handleFilter.subscribe((filterInput) => {
        let places = self.places();
        for (let place of places) {
            if (place.name.toLowerCase().indexOf(filterInput.toLowerCase()) === -1) {
                place.visible(false);
                markers[place.id - 1].setMap(null);
            } else {
                place.visible(true);
                markers[place.id - 1].setMap(map);
            }
        }
    });

    // Open infoWindow when click on the sidebar
    this.onLocationClick = function (place) {
        let marker = markers[place.id - 1];
        google.maps.event.trigger(marker, 'click');
    };

    // Show/hide the menu sidebar
    this.toggleMenu = function () {
        this.menuVisibility(!this.menuVisibility());
    }
}

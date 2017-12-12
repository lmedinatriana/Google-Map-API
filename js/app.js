// LOCATIONS
var myLocations = [{
    title: 'The Smith',
    lat: 40.771536,
    lng: -73.981646,
    type: 'Restaurant'
}, {
    title: 'Hummus Place',
    lat: 40.780072,
    lng: -73.980303,
    type: 'Restaurant'
}, {
    title: 'Flame',
    lat: 40.783976,
    lng: -73.974504,
    type: 'Restaurant'
}, {
    title: 'Chirping Chicken',
    lat: 40.781586,
    lng: -73.979046,
    type: 'Restaurant'
}, {
    title: 'Caledonia UWS',
    lat: 40.784163,
    lng: -73.977919,
    type: 'Nightlife'
}, {
    title: 'Shalel Lounge',
    lat: 40.776098,
    lng: -73.979329,
    type: 'Nightlife'
}, {
    title: 'Beacon Theatre',
    lat: 40.780496,
    lng: -73.981091,
    type: 'Nightlife'
}, {
    title: 'West Side Comedy Club',
    lat: 40.780945,
    lng: -73.980372,
    type: 'Nightlife'
}, {
    title: 'Chase Bank',
    lat: 40.779529,
    lng: -73.982207,
    type: 'Banks'
}, {
    title: 'Wells Fargo Bank',
    lat: 40.777856,
    lng: -73.982684,
    type: 'Banks'
}, {
    title: 'TD Bank',
    lat: 40.775465,
    lng: -73.982672,
    type: 'Banks'
}, {
    title: 'Bank of America',
    lat: 40.771016,
    lng: -73.981612,
    type: 'Banks'
}]

// STYLING MAP
var styles = [{
    "featureType": "water",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#c8def4"
    }]
}, {
    "featureType": "landscape",
    "stylers": [{
        "color": "#e5e5e5"
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e3eed3"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#bdcdd3"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#bdcdd3"
    }]
}, {
    "featureType": "administrative",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "road"
}, {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": 18
    }]
}, {
    "featureType": "road",
    "stylers": [{
        "lightness": 18
    }]
}];

var map, clientID, clientSecret;

function AppViewModel() {
    var self = this;

    this.searchOption = ko.observable("");
    this.markers = [];

    // MARKER INFOWINDOW
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            // FOURSQUARE
            // CLIENT ID
            clientID = "2ZWDUFPUPLJ2SPKG5TIEUJR40B12UT15DTBVWI44NIBLC13N";
            clientSecret =
                "2LUZN5HTFIYJAZ2RYRLDVJ54ED1Z3ZT5CPLHCAKRGMYEVUZZ";
            // FOURSQUARE API CALL
            var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + marker.title +
                '&v=20170708' + '&m=foursquare';
            // FOURSQUARE API
            $.getJSON(apiUrl).done(function(marker) {
                var response = marker.response.venues[0];
                self.street = response.location.formattedAddress[0];
                self.city = response.location.formattedAddress[1];
                self.zip = response.location.formattedAddress[3];
                self.country = response.location.formattedAddress[4];
                self.category = response.categories[0].shortName;

                self.htmlContentFoursquare =
                    '<h5 class="iw_subtitle">(' + self.category +
                    ')</h5>' + '<div>' +
                    '<h6 class="iw_address_title"> Address: </h6>' +
                    '<p class="iw_address">' + self.street + '</p>' +
                    '<p class="iw_address">' + self.city + '</p>' +
                    '<p class="iw_address">' + self.zip + '</p>' +
                    '<p class="iw_address">' + self.country +
                    '</p>' + '</div>' + '</div>';

                infowindow.setContent(self.htmlContent + self.htmlContentFoursquare);
            }).fail(function() {
                // ERROR MESSAGE
                alert(
                    "Oops. There was an issue. Please try refreshing your page."
                );
            });

            this.htmlContent = '<div>' + '<h4 class="iw_title">' + marker.title +
                '</h4>';

            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };

    this.populateAndBounceMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1400);
    };

    this.initMap = function() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(40.776906, -73.980065),
            zoom: 15,
            styles: styles
        };
        // CONSTRUCTOR
        map = new google.maps.Map(mapCanvas, mapOptions);


        this.largeInfoWindow = new google.maps.InfoWindow();
        for (var i = 0; i < myLocations.length; i++) {
            this.markerTitle = myLocations[i].title;
            this.markerLat = myLocations[i].lat;
            this.markerLng = myLocations[i].lng;

            // MARKERS
            this.marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: this.markerLat,
                    lng: this.markerLng
                },
                title: this.markerTitle,
                lat: this.markerLat,
                lng: this.markerLng,
                id: i,
                animation: google.maps.Animation.DROP
            });
            this.marker.setMap(map);
            this.markers.push(this.marker);
            this.marker.addListener('click', self.populateAndBounceMarker);
        }
    };

    this.initMap();

    // APPENDED LIST MENU
    this.myLocations = ko.computed(function() {
        var result = [];
        for (var i = 0; i < this.markers.length; i++) {
            var markerLocation = this.markers[i];
            if (markerLocation.title.toLowerCase().includes(this.searchOption()
                    .toLowerCase())) {
                result.push(markerLocation);
                this.markers[i].setVisible(true);
            } else {
                this.markers[i].setVisible(false);
            }
        }
        return result;
    }, this);
}

googleError = function googleError() {
    alert(
        'Oops. There was an issue. Please try refreshing your page.'
    );
};

function startApp() {
    ko.applyBindings(new AppViewModel());
}

$(document).ready(function() {
    function setHeight() {
        windowHeight = $(window).innerHeight();
        $('#map').css('min-height', windowHeight);
        $('#sidebar').css('min-height', windowHeight);
    };
    setHeight();

    $(window).resize(function() {
        setHeight();
    });
});
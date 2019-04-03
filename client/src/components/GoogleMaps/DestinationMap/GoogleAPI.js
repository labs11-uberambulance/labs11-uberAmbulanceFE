let map, searchBox;
const initMap = (options) => () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.453, lng: 32.697 }, zoom: 8,
        clickableIcons: false, mapTypeControl: false, minZoom: 7,
        restriction: { latLngBounds: { north: 4.35, south: -1.5, west: 29.55, east: 34.6 } },
        streetViewControl: false
    });
    options && initSearchBox(options.placesCB, options.markerCB)
}

const initSearchBox = (placesCB, markerCB) => {
    const input = document.getElementById('google-search');
    searchBox = new window.google.maps.places.SearchBox(input);
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length < 1) return
        markers.forEach(marker => {
            marker.setMap(null);
        });
        map.panTo(places[0].geometry.location);
        if (places.length === 1) {
            map.setZoom(10)
        } else {
            map.setZoom(8)
        }
        markers = []
        placesCB(places)
        markers = createAndDisplayMarkers(places, markerCB)
    })
}

export const initGoogleScript = (options)  => {
    if (!window.google) {
        window.initMap = initMap(options)
        const googleAPI = document.createElement('script');
        googleAPI.id = "google-api";
        googleAPI.async = true;
        googleAPI.defer = true;
        googleAPI.src = process.env.REACT_APP_googleApiKey;
        document.getElementsByTagName("body")[0].appendChild(googleAPI);
    }
    return
}


// MAIN GOOGLE MAPS LOGIC
const createAndDisplayMarker = (place, passComponentNameOfMarkerClicked, infoWindow) => {
    const marker = new window.google.maps.Marker({
        map, position: place.geometry.location,
        animation: window.google.maps.Animation.DROP,
        title: place.name,
        icon: {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(20, 20)
        }
    })
    window.google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
        passComponentNameOfMarkerClicked(place.id)
    })
    return marker;
}
const createAndDisplayMarkers = (places, markerCB) => {
    let newMarkers = [];
    const infoWindow = new window.google.maps.InfoWindow();
    places.forEach(place => {
        newMarkers.push(createAndDisplayMarker(place, markerCB, infoWindow))
    })
    return newMarkers;
}

// teardown of google maps from DOM when component is unmounted
export const destroyGoogleScript = () => {
    const googleAPI = document.getElementById("google-api");
    googleAPI.parentNode.removeChild(googleAPI);
    window.google = null;
    let scripts = Array.from(document.getElementsByTagName("script"));
    scripts.forEach(script => {
      if (script.src.match(/maps\.googleapis/)) {
          script.parentNode.removeChild(script);
      }
  })
}
// MAP CUSTOME STYLING EXAMPLE
const styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]


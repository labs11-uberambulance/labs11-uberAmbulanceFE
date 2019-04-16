import { styles } from "../MapStyle";
let map, searchBox, marker, markerListener, directionsService, directionsDisplay, geocoder;

const initMap = (placesCB, markerCB, lat, lng) => () => {
  directionsService = new window.google.maps.DirectionsService();
  directionsDisplay = new window.google.maps.DirectionsRenderer();
  geocoder = new window.google.maps.Geocoder();
  map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat, lng }, zoom: 12, styles, clickableIcons: false,
    mapTypeControl: false, minZoom: 5, streetViewControl: false,
    restriction: { latLngBounds: { north: 4.35, south: -1.5, west: 29.55, east: 34.6 } },
  });
  directionsDisplay.setMap(map);
  createAndDisplayMarker(lat, lng);
  initSearchBox(placesCB, markerCB);
};
export const initSearchBox = (placesCB, markerCB) => {
  const input = document.getElementById("google-search");
  searchBox = new window.google.maps.places.SearchBox(input);
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length < 1) return;
    markers.forEach(marker => {
      marker.setMap(null);
    });
    map.panTo(places[0].geometry.location);
    if (places.length === 1) {
      map.setZoom(12);
    } else {
      map.setZoom(11);
    }
    markers = [];
    placesCB(places);
    markers = createAndDisplayPlaceMarkers(places, markerCB);
  });
};
const createAndDisplayMarker = (lat, lng) => {
  marker = new window.google.maps.Marker({
    map, position: { lat, lng }, draggable: true,
    animation: window.google.maps.Animation.DROP,
    title: "Your Location"
  });
  marker.setPosition({ lat, lng });
  map.setCenter({ lat, lng });
  markerListener = map.addListener("bounds_changed", () => {
    marker.setPosition(map.getCenter());
  });
  // marker.setPosition( {lat, lng});
  // map.setCenter({lat,lng})
};
export const initGoogleScript = (placesCB, markerCB, lat, lng) => {
  if (!window.google) {
    window.initMap = initMap(placesCB, markerCB, lat, lng);
    const googleAPI = document.createElement("script");
    googleAPI.id = "google-api";
    googleAPI.async = true;
    googleAPI.defer = true;
    googleAPI.src = process.env.REACT_APP_googleApiKey;
    document.getElementsByTagName("body")[0].appendChild(googleAPI);
  }
  return;
};

// MAIN GOOGLE MAPS LOGIC
export const searchGoogle = query => {
  const request = {
    query,
    fields: ["name", "geometry"],
    locationBias: map.getBounds()
  };
  const service = new window.google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      map.setZoom(10);
      map.panTo(results[0].geometry.location);
    }
  });
};

export const calcAndDisplayRoute = (origin, destination) => {
  const request = { origin, destination, travelMode: "DRIVING" };
  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsDisplay.setDirections(result);
    }
  });
};

export const lockMarker = () => {
  window.google.maps.event.removeListener(markerListener);
  marker.setDraggable(false);
  return { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
};

export const geocodeLatlng = (latlng, cb) => {
  geocoder.geocode({ location: latlng }, function(results, status) {
    let locName;
    if (status === "OK") {
      if (results[0]) {
        locName = results[0].formatted_address;
        cb(locName);
      } else {
        locName = "Unknown Address.";
        window.alert("No results found");
      }
      return locName;
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
};

export const unlockMarker = () => {
  marker.setDraggable(true);
  markerListener = map.addListener("bounds_changed", () => {
    marker.setPosition(map.getCenter());
  });
};

const createAndDisplayPlaceMarker = (
  place,
  passComponentNameOfMarkerClicked,
  infoWindow
) => {
  const marker = new window.google.maps.Marker({
    map,
    position: place.geometry.location,
    animation: window.google.maps.Animation.DROP,
    title: place.name,
    icon: {
      url: place.icon,
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(20, 20)
    }
  });
  window.google.maps.event.addListener(marker, "click", function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
    passComponentNameOfMarkerClicked(place.name);
  });
  return marker;
};
const createAndDisplayPlaceMarkers = (places, markerCB) => {
  let newMarkers = [];
  const infoWindow = new window.google.maps.InfoWindow();
  places.forEach(place => {
    newMarkers.push(createAndDisplayPlaceMarker(place, markerCB, infoWindow));
  });
  return newMarkers;
};

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
  });
};

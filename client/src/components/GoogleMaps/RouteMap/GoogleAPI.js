let map, marker, directionsService, directionsDisplay;

const initMap = (latStart, lngStart, latStop, lngStop) => () => {
  directionsService = new window.google.maps.DirectionsService();
  directionsDisplay = new window.google.maps.DirectionsRenderer();
  map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: latStart, lng: lngStart },
    zoom: 8,
    clickableIcons: false,
    mapTypeControl: false,
    minZoom: 5,
    restriction: {
      latLngBounds: { north: 4.35, south: -1.5, west: 29.55, east: 34.6 }
    },
    streetViewControl: false
  });
  directionsDisplay.setMap(map);
  createAndDisplayMarker(latStart, lngStart, "Start Location");
  createAndDisplayMarker(latStop, lngStop, "Stop Location");
  calcAndDisplayRoute(
    { lat: latStart, lng: lngStart },
    { lat: latStop, lng: lngStop }
  );
};
const createAndDisplayMarker = (lat, lng, title) => {
  marker = new window.google.maps.Marker({
    map,
    position: { lat, lng },
    draggable: true,
    animation: window.google.maps.Animation.DROP,
    title: title
  });
};
export const initGoogleScript = (latStart, lngStart, latStop, lngStop) => {
  // const latStart = latStart || 1.153;
  // const lngStart = lngStart || 32.3;
  // const latStop = latStop || 1.453;
  // const lngStop = lngStop || 32.4;
  if (!window.google) {
    window.initMap = initMap(latStart, lngStart, latStop, lngStop);
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
export const calcAndDisplayRoute = (origin, destination) => {
  const request = { origin, destination, travelMode: "DRIVING" };
  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsDisplay.setDirections(result);
    }
  });
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

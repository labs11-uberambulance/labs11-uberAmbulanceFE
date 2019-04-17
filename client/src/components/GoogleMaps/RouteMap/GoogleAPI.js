import { styles } from "../MapStyle";
let map, directionsService, directionsDisplay;

const initMap = (latStart, lngStart, latStop, lngStop) => {
  directionsService = new window.google.maps.DirectionsService();
  directionsDisplay = new window.google.maps.DirectionsRenderer({
    preserveViewport: true
  });
  map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: latStart, lng: lngStart },
    zoom: 10,
    styles,
    clickableIcons: false,
    mapTypeControl: false,
    minZoom: 7,
    restriction: {
      latLngBounds: { north: 4.35, south: -1.5, west: 29.55, east: 34.6 }
    },
    streetViewControl: false
  });
  directionsDisplay.setMap(map);
  calcAndDisplayRoute(
    { lat: latStart, lng: lngStart },
    { lat: latStop, lng: lngStop }
  );
};
export const initGoogleScript = (latStart, lngStart, latStop, lngStop) => {
  // if (!window.google) {
  window.initMap = () => initMap(latStart, lngStart, latStop, lngStop);
  if (!document.getElementById("google-api")) {
    const googleAPI = document.createElement("script");
    googleAPI.id = `google-api`;
    googleAPI.async = true;
    googleAPI.defer = true;
    googleAPI.src = process.env.REACT_APP_googleApiKey;
    document.getElementsByTagName("body")[0].appendChild(googleAPI);
  } else {
    window.initMap();
  }
  // }
  return;
};

// MAIN GOOGLE MAPS LOGIC
export const calcAndDisplayRoute = (origin, destination) => {
  if (!directionsService) return;
  const request = { origin, destination, travelMode: "DRIVING" };
  // clear old routes here
  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsDisplay.setDirections(result);
      map.setCenter(origin);
    }
  });
};

// teardown of google maps from DOM when component is unmounted
export const destroyGoogleScript = () => {
  // const googleAPI = document.getElementById("google-api");
  // googleAPI.parentNode.removeChild(googleAPI);
  // window.google = null;
  // let scripts = Array.from(document.getElementsByTagName("script"));
  // scripts.forEach(script => {
  //   if (script.src.match(/maps\.googleapis/)) {
  //     script.parentNode.removeChild(script);
  //   }
  // });
  let scripts = Array.from(document.getElementsByTagName("script"));
  let googScripts = scripts.filter(script => {
    if (script.src.match(/maps\.googleapis/)) {
      return true;
    } else {
      return false;
    }
  });
  let have = [];
  googScripts.forEach(script => {
    if (have.includes(script.src)) {
      script.parentNode.removeChild(script);
    } else {
      have.push(script.src);
    }
  });
};

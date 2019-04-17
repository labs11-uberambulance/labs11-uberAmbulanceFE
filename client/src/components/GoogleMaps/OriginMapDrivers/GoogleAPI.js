import { styles } from "../MapStyle";
let map, marker;
const initMap = (lat, lng, mapId) => {
  // console.log("initMap: ", lat, lng);
  map = new window.google.maps.Map(document.getElementById(`map-${mapId}`), {
    center: { lat, lng },
    zoom: 8,
    styles,
    clickableIcons: false,
    mapTypeControl: false,
    minZoom: 7,
    restriction: {
      latLngBounds: { north: 4.35, south: -1.5, west: 29.55, east: 34.6 }
    },
    streetViewControl: false
  });
  createAndDisplayMarker(lat, lng);
};

export const initGoogleScript = (latInit, lngInit, mapId) => {
  // console.log("initGoogScript: ", latInit, lngInit);
  // if (!window.google) {
  window.initMap = () => initMap(latInit, lngInit, mapId);
  const googleAPI = document.createElement("script");
  googleAPI.id = `google-api-${mapId}`;
  googleAPI.async = true;
  googleAPI.defer = true;
  googleAPI.src = process.env.REACT_APP_googleApiKey;
  document.getElementsByTagName("body")[0].appendChild(googleAPI);
  // document.getElementById(`map-scripts-${mapId}`).appendChild(googleAPI);
  // }
  return;
};

const createAndDisplayMarker = (lat, lng) => {
  // console.log("createAndDisplayMarker: ", lat, lng);
  marker = new window.google.maps.Marker({
    map,
    position: { lat, lng },
    animation: window.google.maps.Animation.DROP,
    draggable: true,
    title: "Your Location"
  });
  map.addListener("bounds_changed", () => {
    marker.setPosition(map.getCenter()); // this could be used to set the pin at center of map
  });
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
export const fetchMarkerPosition = () => {
  return marker.getPosition().toUrlValue();
};

// teardown of google maps from DOM when component is unmounted
export const destroyGoogleScript = mapId => {
  const googleAPI = document.getElementById(`google-api-${mapId}`);
  googleAPI.parentNode.removeChild(googleAPI);
  // window.google = null;
  // const mapScripts = document.getElementById(`map-scripts-${mapId}`);
  // mapScripts.parentNode.removeChild(mapScripts);
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

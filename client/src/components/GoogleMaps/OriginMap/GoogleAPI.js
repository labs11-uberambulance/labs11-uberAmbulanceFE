let map, marker;
const initMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.453, lng: 32.697 }, zoom: 8,
        clickableIcons: false, mapTypeControl: false, minZoom: 7,
        restriction: { latLngBounds: { north: 4.35, south: -1.5, west: 29.55, east: 34.6 } },
        streetViewControl: false
    });
    createAndDisplayMarker();
}

export const initGoogleScript = (options)  => {
    if (!window.google) {
        window.initMap = initMap;
        const googleAPI = document.createElement('script');
        googleAPI.id = "google.api";
        googleAPI.async = true;
        googleAPI.defer = true;
        googleAPI.src = process.env.REACT_APP_googleApiKey;
        document.getElementsByTagName("body")[0].appendChild(googleAPI);
    }
    return
}

const createAndDisplayMarker = () => {
    marker = new window.google.maps.Marker({
        map, position: { lat: 1.453, lng: 32.697 },
        animation: window.google.maps.Animation.DROP,
        draggable: true,
        title: "Your Location"
    });
    map.addListener('bounds_changed', () => {
        marker.setPosition(map.getCenter());
    });
}


// MAIN GOOGLE MAPS LOGIC
export const searchGoogle = (query) => {
    const request = { query, fields: ["name", "geometry"], locationBias: map.getBounds() }
    const service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            map.setZoom(10)
            map.panTo(results[0].geometry.location)
        }
    })
}
export const fetchMarkerPosition = () => {
    return marker.getPosition().toUrlValue();
}


// teardown of google maps from DOM when component is unmounted
export const destroyGoogleScript = () => {
    const googleAPI = document.getElementById("google-api");
    googleAPI.parentNode.removeChild(googleAPI);
    window.google = null;
    // might need to handle header <script> cleanup if react-router-dom doesn't rewrite header
}
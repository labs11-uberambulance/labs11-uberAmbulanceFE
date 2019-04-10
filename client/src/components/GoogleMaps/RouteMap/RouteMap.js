import React, { Component } from "react";
import { initGoogleScript, destroyGoogleScript } from "./GoogleAPI";

import "./RouteMap.css";

class RouteMap extends Component {
  state = {
    places: null,
    search: "",
    markersSelected: []
  };

  render() {
    let { places, markersSelected } = { ...this.state };
    if (markersSelected.length > 0) {
      places = places.filter(place => markersSelected.includes(place.name));
    }
    return (
      <div style={{ display: "flex", height: "500px" }}>
        <div id="map" />
      </div>
    );
  }
  componentDidMount() {
    const startArr = this.props.start.split(",");
    const stopArr = this.props.stop.split(",");
    initGoogleScript(+startArr[0], +startArr[1], +stopArr[0], +stopArr[1]);
  }
  componentWillUnmount() {
    destroyGoogleScript();
  }
}

export default RouteMap;

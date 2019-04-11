import React, { Component } from "react";
import {
  initGoogleScript,
  destroyGoogleScript,
  calcAndDisplayRoute
} from "./GoogleAPI";

import "./RouteMap.css";

class RouteMap extends Component {
  state = {};

  render() {
    const startArr = this.props.start.split(",");
    const stopArr = this.props.stop.split(",");
    calcAndDisplayRoute(
      { lat: +startArr[0], lng: +startArr[1] },
      { lat: +stopArr[0], lng: +stopArr[1] }
    );
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

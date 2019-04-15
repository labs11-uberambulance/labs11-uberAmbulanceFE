import React, { Component } from "react";
import {
  initGoogleScript,
  destroyGoogleScript,
  calcAndDisplayRoute
} from "./GoogleAPI";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

// import "./RouteMap.css";

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
      <Grid container direction="column" justify="center" alignItems="center">
        <Card
          style={{
            height: "60vh",
            width: "90%",
            position: "relative",
            margin: "20px 0"
          }}
        >
          <div
            id="map"
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "0",
              boxShadow: "none"
            }}
          />
        </Card>
      </Grid>
      // <div style={{ display: "flex", height: "500px" }}>
      //   <div id="map" />
      // </div>
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

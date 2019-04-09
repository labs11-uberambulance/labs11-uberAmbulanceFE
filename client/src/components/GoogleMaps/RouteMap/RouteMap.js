import React, { Component } from "react";
import { initGoogleScript, destroyGoogleScript } from "./GoogleAPI";
import { TextField, Button } from "@material-ui/core";

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
      <div style={{ display: "flex" }}>
        <div>
          <div className="google-search-container">
            <TextField
              id="google-search"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
              fullWidth
            />
            {places < this.state.places && (
              <Button
                type="button"
                onClick={() => this.setState({ markersSelected: [] })}
              >
                Show All
              </Button>
            )}
          </div>
          <div id="map" />
        </div>
        {/* uncomment if we want to display a list of places next to map
        { places && <GooglePlacesList places={Array.isArray(places) ? places: [places]} /> } */}
      </div>
    );
  }
  //   call backs for getting places and markers clicked
  componentDidMount() {
    const startArr = this.props.start.split(",");
    const stopArr = this.props.stop.split(",");
    initGoogleScript(
      parseFloat(startArr[0]),
      parseFloat(startArr[1]),
      parseFloat(stopArr[0]),
      parseFloat(stopArr[1])
    );
  }
  componentWillUnmount() {
    destroyGoogleScript();
  }
}

export default RouteMap;

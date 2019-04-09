import React, { Component } from "react";
import {
  initGoogleScript,
  destroyGoogleScript,
  searchGoogle,
  fetchMarkerPosition
} from "./GoogleAPI";
import "./OriginMap.css";
import { TextField, Button } from "@material-ui/core";

class OriginMap extends Component {
  constructor(props) {
    super(props);
    this.userInp = React.createRef();
  }
  searchForLocationHandler = e => {
    if (e.key === "Enter") {
      searchGoogle(this.userInp.current.value);
    }
  };
  originDeterminedHandler = () => {
    const originLatLng = fetchMarkerPosition();
    this.props.storeLatLng(originLatLng);
    // console.log(originLatLng);
  };

  render() {
    // console.log(this.props.latInit, this.props.lngInit);
    return (
      <>
        <div>
          <div style={{ height: "500px" }}>
            <TextField
              inputRef={this.userInp}
              onKeyPress={this.searchForLocationHandler}
            />
            <div id="map" />
          </div>
        </div>
        <Button color="primary" onClick={this.originDeterminedHandler}>
          Set Location
        </Button>
      </>
    );
  }
  componentDidMount() {
    // console.log("CDM Origin Map: ", this.props.latInit, this.props.lngInit);
    // pass in latInit, lngInit to set origin at custom point, otherwise default value is set.
    const lat = this.props.latInit || 1.453;
    const lng = this.props.lngInit || 32.697;
    initGoogleScript(lat, lng);
  }
  componentWillUnmount() {
    destroyGoogleScript();
  }
}

export default OriginMap;

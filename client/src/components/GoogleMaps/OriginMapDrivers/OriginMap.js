import React, { Component } from "react";
import {
  initGoogleScript,
  destroyGoogleScript,
  searchGoogle,
  fetchMarkerPosition,
  setMarker
} from "./GoogleAPI";
// import "./OriginMap.css";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class OriginMap extends Component {
  constructor(props) {
    super(props);
    this.userInp = React.createRef();
    this.state = {
      newLatLng: false
    };
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
  markerPosChgHandler = () => {
    if (!this.state.newLatLng) {
      // only do this on first change
      const newLatLng = fetchMarkerPosition();
      if (newLatLng !== `${this.props.latInit},${this.props.lngInit}`) {
        this.setState({ newLatLng: true });
      }
    }
  };
  revertHandler = () => {
    console.log("revert pos");
    setMarker(this.props.latInit, this.props.lngInit);
    this.setState({ newLatLng: false });
  };

  render() {
    console.log(this.props.latInit, this.props.lngInit);
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={32}
        >
          <Grid item xs={8}>
            <Typography variant="h6" style={{ padding: "15px" }}>
              Your Current Location
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {this.state.newLatLng ? (
              <>
                <Button
                  // color="primary"
                  style={{ color: "rgb(0,133,115)" }}
                  onClick={this.revertHandler}
                >
                  Cancel
                </Button>
                <Button
                  // color="primary"
                  style={{ color: "rgb(0,133,115)" }}
                  onClick={this.originDeterminedHandler}
                >
                  Update
                </Button>
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={32}
        >
          <Grid item xs={12}>
            <TextField
              inputRef={this.userInp}
              onKeyPress={this.searchForLocationHandler}
              label="Search"
              placeholder="Search"
              style={{ width: "80%", borderColor: "rgb(0,133,115)" }}
            />
          </Grid>
        </Grid>
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
              id={`map-${this.props.mapId}`}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "0",
                boxShadow: "none"
              }}
            />
          </Card>
        </Grid>
      </>
    );
  }
  componentDidMount() {
    // console.log("CDM Origin Map: ", this.props.latInit, this.props.lngInit);
    // pass in latInit, lngInit to set origin at custom point, otherwise default value is set.
    const lat = this.props.latInit || 1.453;
    const lng = this.props.lngInit || 32.697;
    initGoogleScript(lat, lng, this.props.mapId, this.markerPosChgHandler);
  }
  componentWillUnmount() {
    destroyGoogleScript(this.props.mapId);
  }
}

export default OriginMap;

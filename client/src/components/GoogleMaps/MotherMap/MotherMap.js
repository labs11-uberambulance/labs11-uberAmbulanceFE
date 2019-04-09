import React, { Component } from "react";
import {connect} from 'react-redux'
import RequestBox from './RequestBox.js'


import { Button, withStyles } from "@material-ui/core";
import GooglePlacesList from "../../GooglePlacesList/GooglePlacesList";
import {
  initGoogleScript,
  searchGoogle,
  lockMarker,
  unlockMarker,
  calcAndDisplayRoute,
  destroyGoogleScript
} from "./GoogleAPI";
import "./MotherMap.css";

const styles = ({ palette }) => ({
  root: {
    position: "absolute",
    zIndex: "40",
    top: "10px",
    left: "5px",
    color: palette.secondary.contrastText,
    backgroundColor: palette.secondary.dark
  }
});
class MotherMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      search: "",
      markersSelected: [],
      locked: false,
      startCoords: null,
      lat: Number(this.props.user.location.latlng.split(",")[0]),
      lng: Number(this.props.user.location.latlng.split(",")[1])
    };
  }

  // {32.092681121826146}

  toggleMarkLockHandler = () => {
    this.setState(({ locked }) => {
      if (locked) {
        unlockMarker();
        return { search: "", places: null, markersSelected: [], locked: false };
      } else {
        const position = lockMarker();
        this.props.setRideStart && this.props.setRideStart(position);
        console.log(position);
        return { search: "", locked: true, startCoords: position };
      }
    });
  };

  searchForLocationHandler = e => {
    if (e.key === "Enter") {
      searchGoogle(this.state.search);
    }
  };

  mapOutRoute = place => {
    const location = {
      // endpoint
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    this.props.setRideEnd && this.props.setRideEnd(location, place)
    calcAndDisplayRoute(this.state.startCoords, location);
    this.props.storeRoute && this.props.storeRoute({
      start: {
        latlng: `${this.state.startCoords.lat},${this.state.startCoords.lng}`
      },
      destination: { latlng: `${location.lat},${location.lng}` }
    });
  };
  render() {
    
    let { places, markersSelected } = { ...this.state };
    if (markersSelected.length > 0) {
      places = places.filter(place => markersSelected.includes(place.name));
    }
    const commonTextProps = {
      value: this.state.value,
      onChange: e => this.setState({ search: e.target.value }),
      fullWidth: true
    };
    return (
      <>
        <div style={{ margin: "0 auto", width: "97.5%" }}>
          <div className="google-maps-container" style={{ }}>
            <div id="map" />
            <RequestBox
            toggleMarkLockHandler={this.toggleMarkLockHandler}
            searchForLocationHandler={this.searchForLocationHandler}
            commonTextProps={commonTextProps}
            locked={this.state.locked}
            />
          </div>
          
        </div>
        {places && (
          <GooglePlacesList
            places={Array.isArray(places) ? places : [places]}
            setDestination={this.mapOutRoute}
          />
        )}
      </>
    );
  }
  //   call backs for getting places and markers clicked
  passPlacesToComponent = places => {
    this.setState({ places, markersSelected: [] });
  };
  markerSelectedHandler = name => {
    this.setState(({ markersSelected }) => {
      const markers = [...markersSelected];
      markers.push(name);
      return { markersSelected: markers };
    });
  };
  componentDidMount() {
    initGoogleScript(this.passPlacesToComponent, this.markerSelectedHandler, this.state.lat, this.state.lng ); // takes lat/long as 3rd/4th args, sets start pin & zooms there
  }
  componentWillUnmount() {
    destroyGoogleScript();
  }
        //   call backs for getting places and markers clicked
    passPlacesToComponent = (places) => {
        this.setState({ places, markersSelected: [] })
    }
    markerSelectedHandler = (name) => {
        this.setState(({ markersSelected }) => {
            const markers = [...markersSelected];
            markers.push(name);
            return { markersSelected: markers }
        })
    }
    // // componentDidMount() {
    // //     initGoogleScript(this.passPlacesToComponent, this.markerSelectedHandler, this.state.lat, this.state.lng)
    // //     setTimeout(()=>{
    // //         calcAndDisplayRoute({lat: 0.918607, lng: 33.409670999999996}, {lat: 0.988607, lng: 33.509670999999996})
    // //     }, 1000)
    // // }
    // componentWillUnmount() {
    //     destroyGoogleScript()
    // }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps)(withStyles(styles)(MotherMap));

import React, { Component } from "react";
import { connect } from "react-redux";
import { clearRides } from "../../../store/actions/rides";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import GooglePlacesList from "../../GooglePlacesList/GooglePlacesList";
import {
  initGoogleScript,
  searchGoogle,
  lockMarker,
  unlockMarker,
  calcAndDisplayRoute,
  destroyGoogleScript,
  geocodeLatlng
} from "./GoogleAPI";
import "./MotherMap.css";
import DriverCard from "./DriverCard";
import Drawer from "../../Mothers/Drawer";

const styles = ({ palette }) => ({
  root: {
    zIndex: "40",
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.dark,
    width: "90%",
    margin: "10px auto",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "green"
    }
  },
  firstButton: {
    zIndex: "40",
    color: palette.primary.contrastText,
    backgroundColor: palette.secondary.dark,
    width: "90%",
    margin: "10px auto",
    alignSelf: "flex-start",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "purple"
    }
  },
  hidden: {
    opacity: 0,
    zIndex: -10,
  },
  show: {
    opacity: 1,
    zIndex: 20,

  },
  modalHeight: {},
  finalMessage: {
    zIndex: "100",
    width: "80%",
    backgroundColor: "white",
    alignSelf: "center",
    fontSize: "2.5rem",
    borderRadius: "15px",
    padding: "10px 10px 32px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)"
  },
  homeBTN:{
     width: "100%",
    padding: "10px", 
    background: "#2196f3", 
    margin: "5px auto", 
    '&:hover':{
      background:'pink'
    }
  },
  submitBTN:{
    width:'49%', 
    backgroundColor:'rgb(0, 133, 115)',
    '&:hover':{
      background:'pink'
    }
  },
  cancelBTN:{
    width:'49%', 
    backgroundColor:'red',
    '&:hover':{
      background:'pink'
    }
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
      startCoords: { lat: 0.346996, lng: 32.578201 },
      lat: 0.346996,
      lng: 32.578201,
      open: true,
      toggleModal: false
    };
  }
  // Default values: Middle of Uganada 0.346996, 32.578201
  goBack = () => {
    this.setState({ search: "" });
    this.props.clearRides();
  };
  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  toggleMarkLockHandler = (e) => {
    console.log(e.target)
    if(e.target.name === 'homeD'){
      const position = this.state.startCoords
      console.log(position)
      geocodeLatlng(position, locName => {
        console.log(locName);
        this.props.setRideStart && this.props.setRideStart(position, locName);
      });
      return this.setState({ search: "", locked: true, startCoords: position, toggleModal: true });
    }
    else{
    this.setState(({ locked })=> {
    if (locked) {
        unlockMarker();
        return {
          search: "",
          places: null,
          markersSelected: [],
          locked: false,
          startCoords: {
            lat: Number(this.props.user.location.latlng.split(",")[0]),
            lng: Number(this.props.user.location.latlng.split(",")[1])
          },
        }
      } else {
        const position = lockMarker();
        console.log('@#$', position)
        geocodeLatlng(position, locName => {
          console.log(locName);
          this.props.setRideStart && this.props.setRideStart(position, locName);
        });
        console.log(position);
        return { search: "", locked: true, startCoords: position, toggleModal: true };
      }
    });
  }
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
    this.props.setRideEnd && this.props.setRideEnd(location, place);
    calcAndDisplayRoute(this.state.startCoords, location);
    this.props.storeRoute &&
      this.props.storeRoute({
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
    const pad20={
      padding: '20px'
    }
    return (
      <div className="google-maps-container" style={{}}>
        <Drawer />
        <div id="map" />
        {this.props.finished ? (
          <section className={this.props.classes.finalMessage}>
            <h3>
              Thank you for requesting a ride! Please check your phone for
              updates from Birthride and your driver. If {this.props.driverName}{" "}
              is unavailable we'll find another similar driver in the area.
            </h3>
            <Button
              variant="contained"
              width="50%"
              className={this.props.classes.firstButton}
              onClick={() => window.location.reload()}
            >
              Try Again?
            </Button>
            <Button
              variant="contained"
              width="50%"
              className={this.props.classes.firstButton}
              onClick={() => {
                this.props.history.push("/logout");
              }}
            >
              Logout
            </Button>
          </section>
        ) : (
          <>
            <div className={this.state.locked ? "reqBoxTwo" : "reqBox"}>
              {!this.props.selectedDriver ? (
                this.props.rides.length > 0 ? (
                  <>
                    <i
                      className="fas fa-arrow-circle-left hover-cursor"
                      onClick={() => this.goBack()}
                    />

                    {this.props.rides.map(ride => {
                      return (
                        <DriverCard
                          key={ride.driver.id}
                          selectDriver={this.props.selectDriver}
                          ride={ride}
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    {this.state.locked ? (
                      <i
                        className="fas fa-arrow-circle-left hover-cursor"
                        onClick={this.toggleMarkLockHandler}
                      />
                    ) : null}
                    {!this.state.locked ? (
                      <div mx="auto">
                        <Button variant="contained" width="50%" color="primary"
                          className={
                            !this.state.locked
                              ? this.props.classes.firstButton
                              : this.props.classes.root
                          }
                          onClick={this.handleClickOpen}
                        >
                          {!this.state.locked ? "Search New Pickup Location" : `Set Destination`}
                        </Button>
                      </div>
                    ) : 
                    null
                    // (
                    //   <Button
                    //     variant="contained"
                    //     width="90%"
                    //     className={
                    //       !this.state.locked
                    //         ? this.props.classes.firstButton
                    //         : this.props.classes.root
                    //     }
                    //     onClick={this.handleClickOpen}
                    //   >
                    //     {!this.state.locked
                    //       ? "Search New Pickup Location"
                    //       : `Set Destination`}
                    //   </Button>
                    // )
                    }
                    {this.state.locked ? null : (
                      <Button
                        variant="contained"
                        mx="auto"
                        onClick={this.toggleMarkLockHandler}
                        className={this.props.classes.root}
                        color="secondary"
                      >
                        Confirm Pickup
                      </Button>
                    )}
                  </>
                )
              ) : (
                <>
                  <i
                    className="fas fa-arrow-circle-left hover-cursor"
                    onClick={() => this.props.removeDriver()}
                  />
                  {console.log(this.props.selectedDriver)}
                  <Button
                    variant="contained"
                    className={this.props.classes.firstButton}
                    onClick={() =>
                      this.props.submitFinalRideRequest(
                        this.props.selectedDriver
                      )
                    }
                  >
                    Final Request with {this.props.driverName}
                  </Button>
                </>
              )}
            </div>
            <div

              className={
                this.state.toggleModal
                  ? this.props.classes.show
                  : this.props.classes.hidden
              }
            >
              <Dialog
                // fullScreen={fullScreen}
                open={this.state.open}
                className={
                  this.state.toggleModal
                    ? this.props.classes.show
                    : this.props.classes.hidden
                }
                fullWidth
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
              <div  style={pad20}>
                <h3 id="responsive-dialog-title">
                  {!this.state.locked
                    ? "Search Pick Up Location"
                    : "Search Destinations"}
                </h3>
                <TextField
                  label="Search for your location"
                  {...commonTextProps}
                  onKeyPress={this.searchForLocationHandler}
                  // need to always have this rendered so when google tries to connect to it we dont get an error
                  // since React hasn't placed it on the DOM.
                  style={this.state.locked ? { display: "none" } : {}}
                />
                <TextField
                  id="google-search"
                  label="Search for your destination"
                  {...commonTextProps}
                  style={!this.state.locked ? { opacity: 0, width: 0, display:"none" } : {}}
                />
                { this.state.locked ? 
                <>
                  <Button className={this.props.classes.homeBTN} >Hospital Default</Button>
                  <div style={{display:'flex', justifyContent: "space-between", width: "100%"}}>
                    <Button className={this.props.classes.submitBTN}>Submit</Button>
                    <Button className={this.props.classes.cancelBTN }>Cancel</Button>
                  </div>
                </>
                  :
                  <>
                  <button className={this.props.classes.homeBTN} name="homeD"onClick={e=>{this.toggleMarkLockHandler(e)}}>Home Default</button>
                  <div style={{display:'flex', justifyContent: "space-between", width: "100%"}}>
                    <Button className={this.props.classes.submitBTN}>Submit</Button>
                    <Button className={this.props.classes.cancelBTN }>Cancel</Button>
                  </div>
                </>
                }
                {/* <div className="modal-btns">
              <Button onClick={this.handleClose} color="primary">
              Disagree
              </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
              </Button>
              </div> */}
              </div>
            </Dialog>
          </div>
            
            {this.state.places && (<div className="places-list">
                  
                    <GooglePlacesList
                      places={Array.isArray(places) ? places : [places]}
                      setDestination={this.mapOutRoute}
                      getDrivers={this.props.getDrivers}
                      rideStart={this.props.rideStart}
                      handleClose={this.handleClose}
                    />
              </div>)}
          </>
        )}
      </div>
    );
  }
  componentDidMount() {
    if (this.props.user.location.latlng) {
      this.setState({
        startCoords: {
          lat: Number(this.props.user.location.latlng.split(",")[0]),
          lng: Number(this.props.user.location.latlng.split(",")[1])
        },
        lat: Number(this.props.user.location.latlng.split(",")[0]),
        lng: Number(this.props.user.location.latlng.split(",")[1])
      });
      initGoogleScript(
        this.passPlacesToComponent,
        this.markerSelectedHandler,
        Number(this.props.user.location.latlng.split(",")[0]),
        Number(this.props.user.location.latlng.split(",")[1])
      ); // takes lat/long as 3rd/4th args,
    } else {
      initGoogleScript(
        this.passPlacesToComponent,
        this.markerSelectedHandler,
        this.state.lat,
        this.state.lng
      ); // takes lat/long as 3rd/4th args, sets start pin & zooms there
    }
  }

  componentWillUnmount() {
    destroyGoogleScript();
  }
  //   call backs for getting places and markers clicked
  passPlacesToComponent = places => {
    this.setState({ places, markersSelected: [], toggleModal: false });
  };
  markerSelectedHandler = name => {
    this.setState(({ markersSelected }) => {
      const markers = [...markersSelected];
      markers.push(name);
      return { markersSelected: markers };
    });
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
  rides: state.rides.rides
});

const mapDispatchToProps = {
  clearRides
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MotherMap));

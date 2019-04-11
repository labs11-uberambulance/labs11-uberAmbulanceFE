import React, { Component } from "react";
import {connect} from 'react-redux'
import { clearRides } from "../../../store/actions/rides";


import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, withStyles } from "@material-ui/core";
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
import DriverCard from './DriverCard'

const styles = ({ palette }) => ({
  root: {
    zIndex: "40",
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.dark,
    width: "90%",
    margin: "10px auto",
    
  },
  firstButton: {
    zIndex: "40",
    color: palette.secondary.contrastText,
    backgroundColor: palette.secondary.dark,
    width: "90%",
    margin: "10px auto",
    alignSelf: "flex-start"
  },
  hidden:{
    opacity: 0,
    zIndex:-10
  },
  show:{
    opacity: 1,
    zIndex: 20,
  },
  modalHeight:{
    
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
      startCoords: {lat: 0.346996, lng:32.578201},
      lat: 0.346996,
      lng: 32.578201,
      open: true,
      toggleModal: false,
    };
  }
  // Default values: Middle of Uganada 0.346996, 32.578201
  goBack= () =>{
    this.setState({
      search: ""
    })
    this.props.clearRides()
  }
  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  toggleMarkLockHandler = () => {
    this.setState(({ locked }) => {
      if (locked) {
        unlockMarker();
        return { search: "", places: null, markersSelected: [], locked: false, startCoords:{lat: Number(this.props.user.location.latlng.split(",")[0]), lng:Number(this.props.user.location.latlng.split(",")[1])} };
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
      <div style={{ margin: "0 auto", width: "97.5%" }}>
        <div className="google-maps-container" style={{ }}>
          <div id="map" />
            <div className={this.state.locked?"reqBoxTwo" :"reqBox"}

            >
            {!this.props.selectedDriver ? this.props.rides.length>0 ?
                <> 
                <i className="fas fa-arrow-circle-left" onClick={()=>this.goBack()}></i>
                
                {this.props.rides.map(ride=>{
                  return <DriverCard key={ride.driver.id} selectDriver={this.props.selectDriver} ride={ride}/>
                })}
                </>
            :
              <>{this.state.locked? <i className="fas fa-arrow-circle-left" onClick={this.toggleMarkLockHandler}></i>:null}
                {!this.state.locked?
                <div
                mx="auto"
                >
                <Button
                width="50%"
                 className={this.props.classes.firstButton}
                 onClick={this.handleClickOpen}>
                  {!this.state.locked? 'Search New Pickup Location' : `Set Destination`}
                </Button>
                <Button
                width="50%"
                 className={this.props.classes.firstButton}
                 onClick={this.toggleMarkLockHandler}
                 >
                  Continue default
                </Button>
                </div>
                :
                <Button
                width="90%"
                 className={this.props.classes.firstButton}
                 onClick={this.handleClickOpen}>
                  {!this.state.locked? 'Search New Pickup Location' : `Set Destination`}
                </Button>
                }
                {this.state.locked? null :<Button mx="auto" onClick={this.toggleMarkLockHandler} className={this.props.classes.root} color="secondary" >Confirm Pickup</Button>}
              </>
            : 
            <>
             <i className="fas fa-arrow-circle-left" onClick={()=>this.props.removeDriver()}></i>
            <Button onClick={()=>this.props.submitFinalRideRequest(this.state.selectedDriver)}>Final Request with {this.props.driverName}</Button>
            </>
            }
            </div>
            <div className={this.state.toggleModal?this.props.classes.show:this.props.classes.hidden}>
              <Dialog
              // fullScreen={fullScreen}
              open={this.state.open}
              className={this.state.toggleModal?this.props.classes.show:this.props.classes.hidden}
              fullWidth
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
              >
              <h3 id="responsive-dialog-title">{!this.state.locked?'Search Pick Up Location': "Search Destinations"}</h3>
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
              style={!this.state.locked ? { opacity: 0, width: 0 } : {}}
              />
              <div>
              {this.state.places && (
              <GooglePlacesList
              places={Array.isArray(places) ? places : [places]}
              setDestination={this.mapOutRoute}
              getDrivers={this.props.getDrivers}
              rideStart={this.props.rideStart}
              handleClose={this.handleClose}
              />
              )}
              </div>
              <div className="modal-btns">
              <Button onClick={this.handleClose} color="primary">
              Disagree
              </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
              </Button>
              </div>
              </Dialog>
            </div>
        </div>
      </div>
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
    if(this.props.user.location.latlng){
      setState({
        startCoords: {lat: Number(this.props.user.location.latlng.split(",")[0]), lng:Number(this.props.user.location.latlng.split(",")[1])},
        lat: Number(this.props.user.location.latlng.split(",")[0]),
        lng: Number(this.props.user.location.latlng.split(",")[1]),
      })
    }
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
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  rides: state.rides.rides
})

const mapDispatchToProps = {
  clearRides
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MotherMap));

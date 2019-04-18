import React, { Component } from "react";
import { connect } from "react-redux";
import { clearRides } from "../../../store/actions/rides";

import {
  TextField,
  Dialog,
  Button,
  withStyles,
  Typography,
  withTheme
} from "@material-ui/core";
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
  dNone:{
    display:'none'
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
    color: '#1976d2',  
    border:" 1px solid #1976d2",
    margin: "0px auto 30px", 
    lineHeight: '1.75',
    fontWeight: '500',
    fontSize: '1.2rem',
    display: 'flex',
    borderRadius: '5px',
    '&:hover':{
      background: '#1976d2',
      cursor: 'pointer',
      color: 'white'
    },
  },
  submitBTN:{
    width:'49%', 
    backgroundColor:'rgb(0, 133, 115)',
    lineHeight: '1.75',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    fontSize: '1.2rem',
    color: 'white',
    borderRadius: '5px',
    '&:hover':{
      background:'rgb(1, 99, 86)',
      cursor: 'pointer'
    }
  },
  cancelBTN:{
    width:'49%', 
    lineHeight: '1.75',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    fontSize: '1.2rem',
    color: '#6d1b7b',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    border: "1px solid #6d1b7b",
    alignSelf: 'center',
    '&:hover':{
      cursor: 'pointer',
      background: '#6d1b7b',
      color: 'white'
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
      toggleModal: false,
      toggleList: true,
      initX: null,
      initY: null,
      top: 0,
      left: 0
    };
  }
  // Default values: Middle of Uganada 0.346996, 32.578201
  goBack = () => {
    this.setState({ search: "", toggleList: true });
    this.props.clearRides();
  };
  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };
  handleClose = () => {
    this.setState({ toggleModal: false });
  };
  showList=()=>{
    this.setState({toggleList:true})
  }
  hideList=()=>{
    this.setState({toggleList:false})
  }
  toggleMarkLockHandler = (e) => {
    console.log(e.target.title)
    if(e.target.title === 'homeD'){
      
      const name = "home_default";
      const position = lockMarker(this.state.startCoords, name)
      geocodeLatlng(position, locName => {
        console.log(locName);
        this.props.setRideStart && this.props.setRideStart(position, locName);
      });
      return this.setState({ search: "", locked: true, startCoords: position, toggleModal: false });
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
        return { search: "", locked: true, startCoords: position, toggleModal: false };
      }
    });
  }
  };
  searchForLocationHandler = e => {
    console.log(e.target)
    if (e.key === "Enter") {
      searchGoogle(this.state.search);
      this.handleClose();
    }
    if(e.target.name === 'submit'){
      searchGoogle(this.state.search)
      this.handleClose()
    }
  };
  cancelHandler = e =>{
    this.setState({
      search:"",
      locked: false,
      toggleModal: false,
      places: null,
      markersSelected: [],
      startCoords: {
        lat: Number(this.props.user.location.latlng.split(",")[0]),
        lng: Number(this.props.user.location.latlng.split(",")[1])
      },
    })
    this.props.clearRides();
  }
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
  dragStartHandler = (e) => {
    this.setState({ initX: e.clientX, initY: e.clientY })
  }
  dragEndHandler = (e) => {
    const maxY = e.currentTarget.parentNode.offsetHeight
    const maxX = e.currentTarget.parentNode.offsetWidth;
    const nextY = e.clientY - this.state.initY + e.currentTarget.offsetTop;
    const nextX = e.clientX - this.state.initX + e.currentTarget.offsetLeft;
    console.log('nextX: ', nextX, 'nextY: ', nextY)
    if ( nextX < maxX && nextX > 0 && nextY < maxY && nextY > 0 ) {
      this.setState({ left: nextX, top: nextY })
    }
  }
  render() {
    let height = "60vh";
    let { places, markersSelected } = { ...this.state };
    if (markersSelected.length > 0) {
      places = places.filter(place => markersSelected.includes(place.name));
      height = places.length < 4 ? `${15 * places.length}vh` : "60vh";
    }
    const commonTextProps = {
      value: this.state.value,
      onChange: e => this.setState({ search: e.target.value }),
      fullWidth: true
    };
    const pad20={
      padding: '0px 20px 20px'
    }
    return (
      <div className="google-maps-container" style={{}}>
        <Drawer />
        <div id="map" />
        {this.props.error ?(
            <div className={this.props.classes.finalMessage}>
            <h2 >Oh no, there are no Drivers in your Area! Please Contact the Hotline for immediate assistance. HOTLINE: ###-###-####</h2>
            <div style={{display:'flex'}}>
            <button
                variant="contained"
                className={this.props.classes.submitBTN}
                onClick={() => console.log('calling hotline')}
              >
                Call HotLine
              </button>
            <div
                variant="contained"
                className={this.props.classes.cancelBTN}
                onClick={() => {
                  this.props.history.push("/logout");
                }}
              >
                Logout
              </div>
            </div>
          </div>
          ): (<>{this.props.finished ? (
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
              {!this.props.selectedDriver ? 
                this.props.rides.length > 0 ? (
                  <>
                    <i className="fas fa-arrow-circle-left hover-cursor" onClick={() => this.goBack()} style={{alignSelf:'center'}}/>
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
                    (
                      <Button
                        variant="contained"
                        width="90%"
                        className={
                          !this.state.locked
                            ? this.props.classes.firstButton
                            : this.props.classes.root
                        }
                        onClick={this.handleClickOpen}
                      >
                         Search Nearby Health Facilities
                      </Button>
                    )
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
             : (
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
                {!this.state.locked
                    ? <p>Use your home address or search for the city nearest you.</p>
                    : <p>Use the term's Hospital or Health Centre to find the one's nearest you.</p>}
                <TextField
                  label="Search for your location"
                  {...commonTextProps}
                  onKeyPress={this.searchForLocationHandler}
                  // need to always have this rendered so when google tries to connect to it we dont get an error
                  // since React hasn't placed it on the DOM.
                  variant='outlined'
                  style={this.state.locked ? { display: "none" } : {margin:"20px auto 5px"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="google-search"
                  label="Search for Hospitals near you"
                  variant='outlined'
                  {...commonTextProps}
                  style={!this.state.locked ? { opacity: 0, width: 0, display:"none" } : {}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                { this.state.locked ? 
                <>
                  
                  <div style={{display:'flex', justifyContent: "space-between", width: "100%", margin: '10px auto'}}>
                    <button 
                    disabled={this.state.search.length<1? true:false}
                    className={this.props.classes.submitBTN}
                    name="submit" onClick={e=>this.searchForLocationHandler(e)}>Submit</button>
                    <div onClick={e=>this.cancelHandler(e)} className={this.props.classes.cancelBTN }>Cancel</div>
                  </div>
                </>
                  :
                  <>
                  {this.props.user.location.latlng ?
                  <div className={this.props.classes.homeBTN}> 
                    <div style={{width: "10%", background: "#1976d2", color: 'white',display: "flex", justifyContent: "center", alignItems: "center",}}
                      title="homeD" onClick={e=>{this.toggleMarkLockHandler(e)}}>
                        <i class="fas fa-home"></i>
                    </div>
                    <p title="homeD" onClick={e=>{this.toggleMarkLockHandler(e)}} style={{ margin: '0 auto', padding: '5px', width: '100%',textAlign: 'center'}}> Continue with your Home Address</p>
                  </div>
                  : 
                  <div className={this.props.classes.homeBTN}> 
                    <div style={{width: "10%", background: "#1976d2", color: 'white',display: "flex", justifyContent: "center", alignItems: "center",}}
                      title="homeD" onClick={e=>{this.toggleMarkLockHandler(e)}}>
                        <i class="fas fa-home"></i>
                    </div>
                    <p title="homeD" onClick={e=>{this.toggleMarkLockHandler(e)}} style={{ margin: '0 auto', padding: '5px', width: '100%',textAlign: 'center'}}> Set your Home Address</p>
                  </div>
                }
                  <div style={{display:'flex', justifyContent: "space-between", width: "100%"}}>
                    <button 
                      className={this.props.classes.submitBTN}
                      name="submit" 
                      onClick={e=>this.searchForLocationHandler(e)}>
                      Submit
                    </button>
                    <div onClick={e=>this.cancelHandler(e)} className={this.props.classes.cancelBTN }>Cancel</div>
                  </div>
                </>
                }
              </div>
            </Dialog>
          </div>
            {this.state.places && (<div className={!this.state.toggleList? this.props.classes.dNone:"places-list"}
            style={{height, top: `${this.state.top}px`, left: `${this.state.left}px` }}
            onDragStart={this.dragStartHandler}
            onDragEnd={this.dragEndHandler}
            draggable
            >
                    <GooglePlacesList
                      hideList = {this.hideList}
                      showList = {this.showList}
                      places={Array.isArray(places) ? places : [places]}
                      setDestination={this.mapOutRoute}
                      getDrivers={this.props.getDrivers}
                      rideStart={this.props.rideStart}
                      handleClose={this.handleClose}
                    />
                    {<Button
                      type="button"
                      color="secondary"
                      className="places-list--button"
                      onClick={() => {this.setState({ markersSelected: [] })}}
                    >Show All</Button>}
              </div>)}
          </>
        )}</>)}
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
  rides: state.rides.rides,
  error: state.rides.error
});

const mapDispatchToProps = {
  clearRides
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MotherMap));

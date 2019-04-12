import React, { Component } from "react";
import { connect } from "react-redux";

import MomProfileMenu from "./MomProfileMenu";
import MotherMap from "../GoogleMaps/MotherMap/MotherMap";
import { Button } from "@material-ui/core";
import { getDrivers } from "../../store/actions/rides";
import axios from "../../axios-instance";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideStart: "",
      rideEnd: "",
      placeInfo: null,
      selectedDriver: "",
      driverName: "",
      completed: false,
      distance: "",
      open: false
    };
  }
  submitFinalRideRequest = firebase_id => {
    console.log(this.state.placeInfo);
    const end = this.state.rideEnd;
    const start = this.state.rideStart;
    const hospital = this.state.placeInfo.name;
    const { name, phone } = this.props.user;
    const distance = this.state.distance;
    const info = { end, start, hospital, name, phone, distance };
    console.log(info);
    axios.post(`/api/rides/request/driver/${firebase_id}`, { ...info });
    this.setState({ completed: true });
  };

  setRideStart = origin =>{
      var latlng = []
      latlng.push(Object.values(origin))
      console.log(latlng)
      this.setState({rideStart: latlng.join()})
  }
  setRideEnd = (dest, place) =>{
       var test = []
      test.push(Object.values(dest))
      console.log(test)
      this.setState({rideEnd: test.join(), placeInfo: place})
  }
  selectDriver = (id, name, distance) =>{
    this.setState({selectedDriver: id, driverName:name, distance: distance.text});
  }
  removeDriver = ()=>{
    this.setState({selectedDriver: '', driverName:"", distance: ""})
  }

  render() {
    console.log(this.props.user)
    return (
      <>
      {this.state.selectedDriver.length>1 ? <button onClick={e=>this.submitFinalRideRequest(this.state.selectedDriver)}>Final Request</button> :null }
      <div>
        <MomProfileMenu/>

        <MotherMap 
        setRideStart={this.setRideStart}
        setRideEnd={this.setRideEnd}
        selectDriver={this.selectDriver}
        getDrivers={this.props.getDrivers}
        submitFinalRideRequest={this.submitFinalRideRequest}
        rideStart={this.state.rideStart}
        selectDriver={this.selectDriver}
        selectedDriver={this.state.selectedDriver}
        submitFinalRideRequest={this.submitFinalRideRequest}
        removeDriver = {this.removeDriver}
        driverName={this.state.driverName}
      /> 
    
      </div> 
      </>
    );
  }
}

const mapStateToProps = state => ({
  rides: state.rides.rides,
  user: state.auth.user
});

const mapDispatchToProps = {
  getDrivers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

import React, { Component } from "react";
import { connect } from "react-redux";

import MotherMap from "../GoogleMaps/MotherMap/MotherMap";
import { getDrivers } from "../../store/actions/rides";
import axios from "../../axios-instance";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideStart: "",
      rideStartName: "",
      rideEnd: "",
      placeInfo: null,
      selectedDriver: "",
      driverName: "",
      completed: false,
      distance: "",
      open: false,
      finished: false
    };
  }
  submitFinalRideRequest = firebase_id => {
    this.setState({ finished: true });
    console.log(this.state.placeInfo);
    const end = this.state.rideEnd;
    const start = this.state.rideStart;
    const startName = this.state.rideStartName;
    const hospital = this.state.placeInfo.name;
    const { name, phone } = this.props.user;
    const distance = this.state.distance;
    const info = { end, start, startName, hospital, name, phone, distance };
    console.log(info);
    axios.post(`/api/rides/request/driver/${firebase_id}`, { ...info });
    this.setState({ completed: true });
  };
  setRideStart = (origin, rideStartName) => {
    var latlng = [];
    latlng.push(Object.values(origin));
    console.log(latlng);
    this.setState({ rideStart: latlng.join(), rideStartName });
  };
  setRideEnd = (dest, place) => {
    var test = [];
    test.push(Object.values(dest));
    console.log(test);
    this.setState({ rideEnd: test.join(), placeInfo: place });
  };
  selectDriver = (id, name, distance) => {
    this.setState({
      selectedDriver: id,
      driverName: name,
      distance: distance.text
    });
  };
  removeDriver = () => {
    this.setState({ selectedDriver: "", driverName: "", distance: "" });
  };

  render() {
    return (
      <>
        <MotherMap
          setRideStart={this.setRideStart}
          setRideEnd={this.setRideEnd}
          selectDriver={this.selectDriver}
          getDrivers={this.props.getDrivers}
          submitFinalRideRequest={this.submitFinalRideRequest}
          rideStart={this.state.rideStart}
          selectedDriver={this.state.selectedDriver}
          removeDriver={this.removeDriver}
          driverName={this.state.driverName}
          finished={this.state.finished}
          history={this.props.history}
        />
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

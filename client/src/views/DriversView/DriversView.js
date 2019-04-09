import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

import HomePage from "../../components/Drivers/HomePage";
import RouteMap from "../../components/GoogleMaps/RouteMap/RouteMap";

function DriversView(props) {
  console.log("DriverView ", props.user);
  const currentRide = props.user.driverData.rides.filter(
    ride => ride.ride_status === "Driver en route"
  );
  return (
    <>
      <RouteMap
        start={props.user.location.latlng}
        stop={currentRide[0].start}
      />
      {/* <HomePage
        user={props.user}
        usrUpdate={props.usrUpdate}
        refreshUserData={props.refreshUserData}
      /> */}
    </>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {
    usrUpdate: (user, data) => dispatch(actions.auth.initUsrUpdate(user, data)),
    refreshUserData: user => dispatch(actions.auth.initOauth(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversView);

import React from 'react'
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {getDrivers} from '../../../store/actions/rides'

function requestButtons(props) {
  return (
    <div>
      <Button onClick={e=>props.handleNext()}>Request Ride</Button>
      <Button onClick={e=>props.handleNext()}>Search Drivers</Button>
    </div>
  )
}


const mapStateToProps = (state) => ({
  user:state.user,
  driver: state.driver,
  ride: state.ride,
})
const mapDispatchToProps ={
  getDrivers
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requestButtons);

import React from 'react'
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {getDrivers} from '../../../store/actions/rides'

function requestButtons(props) {
  return (
    <div>
      <Button onClick={e=>props.getDrivers({lat: 1.079695, lng: 33.366965})}>Request A Ride</Button>
      <Button onClick={e=>console.log('Find Nearest Driver')}>Find nearest Driver</Button>
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

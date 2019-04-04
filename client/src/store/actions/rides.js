import { rideTypes } from "./actionTypes";
import axios from "../../axios-instance";


export const getDrivers = (location) => dispatch =>{
    console.log(location)
    dispatch({type: rideTypes.FIND_DRIVERS_STARTING});
    axios
    .post(`http://localhost:5000/api/rides/drivers`, ({"location":location}))
    .then(res =>  dispatch({type: rideTypes.FIND_DRIVERS_SUCCESS, payload: res}))
    .catch(err => dispatch({type: rideTypes.FIND_DRIVERS_FAIL, payload: err}))
  }

  export const createRide = (start, destination) => dispatch =>{
    console.log(start, destination)
    dispatch({type: rideTypes.CREATE_RIDE_STARTING});
    axios
    .post(`http://localhost:5000/api/rides/new-ride`, (start, destination))
    .then(res =>  dispatch({type: rideTypes.CREATE_RIDE_SUCCESS, payload: res}))
    .catch(err => dispatch({type: rideTypes.CREATE_RIDE_FAIL, payload: err}))
  }
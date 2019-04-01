import { rideTypes } from "./actionTypes";
import axios from "../../axios-instance";



export const getDrivers = (location) => dispatch =>{
    console.log(location)
    dispatch({type: rideTypes.FIND_DRIVERS_STARTING});
    axios
    .post(`http://localhost:5000/api/rides/drivers`, (location))
    .then(res =>  dispatch({type: rideTypes.FIND_DRIVERS_SUCCESS, payload: res}))
    .catch(err => dispatch({type: rideTypes.FIND_DRIVERS_FAIL, payload: err}))
  }
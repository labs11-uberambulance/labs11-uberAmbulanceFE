import {rideTypes} from '../actions/actionTypes'

//lat: 1.079695, lng: 33.366965
const initialState = {
    drivers: {},
    rides: {},
    loading: false,
    error: null,
    driverCount: 0,
    currentRide:{}
}

export default (state = initialState, action) => {
    switch(action.type){
      case rideTypes.FIND_DRIVERS_START:
      return{
          ...state,
          error: null,
          loading: true
      }
      case rideTypes.FIND_DRIVERS_SUCCESS:
      return{
          ...state,
          rides: action.payload.data.map(ride => ride),
          drivers: action.payload.data.map(driver => driver.driver),
          error: null,
          loading: false
      }
      case rideTypes.FIND_DRIVERS_FAIL:
      return{
          ...state,
          error: action.payload,
          loading: false
      }
      case rideTypes.CREATE_RIDE_START:
      return{
          ...state,
          error: null,
          loading: true
      }
      case rideTypes.CREATE_RIDE_SUCCESS:
      return{
          ...state,
          currentRide: action.payload,
          error: null,
          loading: false
      }
      case rideTypes.CREATE_RIDE_FAIL:
      return{
          ...state,
          error: action.payload,
          loading: false
      }
      default:
        return state;
    }
  };
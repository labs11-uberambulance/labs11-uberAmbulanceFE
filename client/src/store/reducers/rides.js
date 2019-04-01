import {rideTypes} from '../actions/actionTypes'

const initialState = {
    drivers: {},
    rides: {},
    loading: false,
    error: null
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
      case rideTypes.FIND_DRIVERS_SUCCESS:
      return{
          ...state,
          error: action.payload,
          loading: false
      }
      default:
        return state;
    }
  };
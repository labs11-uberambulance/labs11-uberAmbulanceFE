import { combineReducers } from "redux";
import authReducer from "./auth";
import ridesReducer from './rides'


export default combineReducers({
  auth: authReducer,
  rides: ridesReducer
});

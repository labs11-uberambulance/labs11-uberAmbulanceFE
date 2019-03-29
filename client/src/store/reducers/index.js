import { combineReducers } from "redux";
import authReducer from "./auth";
import onbrdReducer from "./onbrd";

export default combineReducers({
  auth: authReducer,
  onbrd: onbrdReducer
});

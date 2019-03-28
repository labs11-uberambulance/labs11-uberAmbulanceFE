import { authTypes } from "./actionTypes";
import axios from "../../axios-instance";

export const initOauth = user => dispatch => {
  // console.log(user);
  dispatch({
    type: authTypes.OAUTH_STARTING
  });
  // now that we have a token, set headers for all future axios requests
  console.log("initOauth", user.fireBtoken);
  axios.defaults.headers.common["Authorization"] = user.fireBtoken;
  axios
    .get("/api/users/")
    .then(result => {
      // GET to /api/user will check for user, create if not found.
      // returns found/created user data
      // console.log(result.data);
      const payload = {
        ...user,
        ...result.data
      };
      dispatch({
        type: authTypes.OAUTH_SUCCESS,
        payload: payload
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: authTypes.OAUTH_FAIL
      });
    });
};

export const logout = () => {};

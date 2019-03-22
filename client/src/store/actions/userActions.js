import axios from "../../axios-instance";

export const userActionsTypes = {
  REGISTER_USER_START: "REGISTER_USER_START",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAIL: "REGISTER_USER_FAIL"
};

export const registerUser = userData => dispatch => {
  console.log(`registerUser action, userData: ${userData}`);
  dispatch({ type: userActionsTypes.REGISTER_USER_START });
  axios
    .post("/api/users", userData)
    .then(res => {
      console.log("successful api post, res.body: ", res.body);
      dispatch({
        type: userActionsTypes.REGISTER_USER_SUCCESS,
        payload: res.body
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: userActionsTypes.REGISTER_USER_FAIL,
        payload: err
      });
    });
};

export const userActionsTypes = {
  REGISTER_USER_TYPE_STARTING: "REGISTER_USER_TYPE_STARTING",
  REGISTER_USER_TYPE_SUCCESS: "REGISTER_USER_TYPE_SUCCESS",
  REGISTER_USER_TYPE_FAIL: "REGISTER_USER_TYPE_FAIL"
};

export const registerUser = userData => dispatch => {
  dispatch({ type: userActionsTypes.SET_USER_TYPE_SUCCESS, payload: userType });
  console.log(`user type set to ${userType}`);
};

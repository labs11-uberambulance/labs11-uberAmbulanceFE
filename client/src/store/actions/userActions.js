export const userActionsTypes = {
  SET_USER_TYPE_STARTING: "SET_USER_TYPE_STARTING",
  SET_USER_TYPE_SUCCESS: "SET_USER_TYPE_SUCCESS",
  SET_USER_TYPE_FAIL: "SET_USER_TYPE_FAIL"
};

export const setUserType = userType => dispatch => {
  dispatch({ type: userActionsTypes.SET_USER_TYPE_SUCCESS, payload: userType });
  console.log(`user type set to ${userType}`);
};

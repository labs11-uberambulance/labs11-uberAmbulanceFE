export const userActionsTypes = {
  REGISTER_USER_TYPE_STARTING: "REGISTER_USER_TYPE_STARTING",
  REGISTER_USER_TYPE_SUCCESS: "REGISTER_USER_TYPE_SUCCESS",
  REGISTER_USER_TYPE_FAIL: "REGISTER_USER_TYPE_FAIL"
};

export const registerUser = userData => dispatch => {
  console.log(`registerUser action`);
};

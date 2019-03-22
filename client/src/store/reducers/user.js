import { userActionsTypes } from "../actions/userActions";

const initialState = {
  isRegisteringUser: false,
  user: [],
  userActionError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionsTypes.REGISTER_USER_START:
      return {
        ...state,
        isRegisteringUser: true,
        userActionError: ""
      };
    case userActionsTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case userActionsTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        userActionError: action.payload
      };
    default:
      return state;
  }
};

import { userActionsTypes } from "../actions/userActions";

const initialState = {
  userType: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionsTypes.SET_USER_TYPE_SUCCESS:
      return {
        ...state,
        userType: action.payload
      };
    default:
      return state;
  }
};

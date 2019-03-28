import { authTypes } from "../actions/actionTypes";

const initialState = {
  user: {
    fireBId: null,
    fireBtoken: null
  },
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.AUTH_STARTING:
      return state;

    case authTypes.OAUTH_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload
        }
      };

    default:
      return state;
  }
};

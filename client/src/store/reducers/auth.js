import { authTypes } from "../actions/actionTypes";

const initialState = {
  user: {},
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

    case authTypes.OAUTH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

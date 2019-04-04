import { authTypes } from "../actions/actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.OAUTH_STARTING:
      return state;

    case authTypes.OAUTH_SUCCESS:
      const usrType = action.payload.userData.user_type;
      if (usrType === "drivers") {
        return {
          ...state,
          user: {
            ...action.payload.userData,
            driverData: {
              ...action.payload.driverData
            }
          }
        };
      } else if (usrType === "mothers") {
        return {
          ...state,
          user: {
            ...action.payload.userData,
            motherData: {
              ...action.payload.motherData
            }
          }
        };
      } else {
        return {
          ...state,
          user: {
            ...action.payload.userData
          }
        };
      }
    case authTypes.OAUTH_LOGOUT:
      return initialState;

    case authTypes.ONBRD_STARTING:
      console.log("onboard start reducer");
      return state;

    case authTypes.ONBRD_SUCCESS:
      console.log("onboard success reducer");
      return {
        ...state,
        ...action.payload
      };

    case authTypes.ONBRD_FAIL:
      console.log("onboard fail reducer");
      return state;

    default:
      return state;
  }
};

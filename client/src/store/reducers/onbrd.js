import { onbrdTypes } from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case onbrdTypes.ONBRD_STARTING:
      console.log("onboard start reducer");
      return state;

    case onbrdTypes.ONBRD_SUCCESS:
      console.log("onboard success reducer");
      return {
        ...state,
        user: {
          ...action.payload
        }
      };

    case onbrdTypes.ONBRD_FAIL:
      console.log("onboard fail reducer");
      return state;

    default:
      return state;
  }
};

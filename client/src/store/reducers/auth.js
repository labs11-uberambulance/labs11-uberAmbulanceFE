import { authTypes } from "../actions/actionTypes";

const initialState = {
  user: {
    type: "" // driver, mother, caregiver
  },
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.AUTH_STARTING:
      return state;

    default:
      return state;
  }
};

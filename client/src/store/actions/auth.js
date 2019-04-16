import { authTypes } from "./actionTypes";
import axios from "../../axios-instance";

export const initOauth = user => dispatch => {
  // console.log(user);
  dispatch({
    type: authTypes.OAUTH_STARTING
  });
  // now that we have a token, set headers for all future axios requests
  axios.defaults.headers.common["Authorization"] = user.ftoken;
  axios
    .get(`/api/users`)
    .then(result => {
      // GET to /api/user will check for user, create if not found.
      // returns found/created user data
      // console.log("result: ", result, "user: ", user);
      if (result.data.user.user_type === "drivers") {
        // fetch rides data for drivers
        axios
          .get(`/api/rides/driver`)
          .then(res => {
            const rides = res.data;
            const payload = {
              userData: {
                ...user,
                ...result.data.user
              },
              driverData: {
                ...result.data.driverData,
                rides
              }
            };
            dispatch({
              type: authTypes.OAUTH_SUCCESS,
              payload: payload
            });
          })
          .catch(err => {
            console.log(err);
            dispatch({
              type: authTypes.OAUTH_FAIL
            });
          });
      } else {
        // this is a mother or caregiver
        const payload = {
          userData: {
            ...user,
            ...result.data.user
          },
          motherData: {
            ...result.data.motherData
          }
        };
        dispatch({
          type: authTypes.OAUTH_SUCCESS,
          payload: payload
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: authTypes.OAUTH_FAIL
      });
    });
};

export const logout = dispatch => {
  dispatch({ type: authTypes.OAUTH_LOGOUT });
};

export const initOnbrd = (user, formValues) => dispatch => {
  dispatch({
    type: authTypes.ONBRD_STARTING
  });
  console.log("initOnbrd action");
  console.log("user: ", user, "formValues: ", formValues);
  const {
    name,
    phone,
    type,
    route,
    // driver specific
    imageURL,
    rate,
    // caregiver specific:
    caregiverName
  } = formValues;
  const location =
    type === "drivers"
      ? JSON.stringify(formValues.location)
      : JSON.stringify(route.start);
  // a user record was created automatically with first login but has no user info besides firebase ID.
  // the api checks if user type is set and will not allow creating a user type record if it is. Therefore, create the user type record before updating user record.
  // map formValues to api format:
  const userData = {
    user: {
      name,
      phone,
      user_type: type,
      location
    }
  };
  let typeData;
  if (formValues.type === "mothers") {
    typeData = {
      user_type: "mother",
      motherData: {
        start: JSON.stringify(route.start),
        destination: JSON.stringify(route.destination)
      }
    };
  } else if (formValues.type === "drivers") {
    // console.log("create driver record");
    typeData = {
      user_type: "driver",
      location,
      driverData: {
        price: rate,
        active: false, // initialize at false
        photo_url: imageURL
      }
    };
  } else if (formValues.type === "caregivers") {
    // console.log("create mother record with caregiver info");
    userData.user.user_type = "mothers";
    typeData = {
      user_type: "mother",
      motherData: {
        caretaker_name: caregiverName,
        start: JSON.stringify(route.start),
        destination: JSON.stringify(route.destination)
      }
    };
  } else {
    dispatch({
      type: authTypes.ONBRD_FAIL,
      payload: { error: "incorrect user type" }
    });
  }
  // first create user type record:
  // token should be set at this point by initOauth
  console.log("POST data: ", typeData);
  axios
    .post(`/api/users/onboard/${user.id}`, typeData)
    .then(res => {
      // POST to /api/users/onboard/id will create a mother/driver record (based on user.type) with form values
      // update the user record once it's done:
      console.log("PUT data: ", userData);
      axios
        .put(`/api/users/update/${user.id}`, userData)
        .then(res => {
          console.log(`success updating user record: ${res.body}`);
          const payload = {
            userData: {
              ...user,
              ...userData.user,
              location: JSON.parse(location)
            },
            driverData: {
              ...typeData.driverData,
              rides: []
            },
            motherData: {
              ...typeData.motherData
            }
          };
          console.log("payload: ", payload);
          dispatch({
            type: authTypes.ONBRD_SUCCESS,
            payload: payload
          });
        })
        .catch(err => {
          console.log("error updating user record: ", err);
          dispatch({
            type: authTypes.ONBRD_FAIL,
            error: err
          });
        });
    })
    .catch(err => {
      console.log(`error creating ${type} record: `, err);
      dispatch({
        type: authTypes.ONBRD_FAIL,
        error: err
      });
    });
};

export const initUsrUpdate = (user, data) => dispatch => {
  dispatch({
    type: authTypes.USR_UPDATE_STARTING
  });
  const userId = user.id;
  const updates = { ...data };
  console.log("initUsrUpdate:", updates);
  axios
    .put(`/api/users/update/${userId}`, updates)
    .then(res => {
      const payload = {
        user: {
          ...user,
          ...updates.user,
          motherData: {
            ...user.motherData,
            ...updates.mother
          },
          driverData: {
            ...user.driverData,
            ...updates.driver
          }
        }
      };
      console.log("payload: ", payload);
      dispatch({
        type: authTypes.USR_UPDATE_SUCCESS,
        payload
      });
    })
    .catch(err => {
      console.log(`error updating user id ${userId}'s data: `, err);
      dispatch({
        type: authTypes.USR_UPDATE_FAIL,
        error: err
      });
    });
};

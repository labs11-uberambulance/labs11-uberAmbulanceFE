import { onbrdTypes } from "./actionTypes";
import axios from "../../axios-instance";

export const initOnbrd = (user, formValues) => dispatch => {
  dispatch({
    type: onbrdTypes.ONBRD_STARTING
  });
  console.log("initOnbrd action");
  console.log("user: ", user, "formValues: ", formValues);
  const {
    name,
    phone,
    type,
    description,
    town,
    email,
    dueDate,
    hospital
  } = formValues;
  // a user record was created automatically with first login but has no user info besides firebase ID.
  // the api checks if user type is set and will not allow creating a user type record if it is. Therefore, create the user type record before updating user record.
  // first create user type record:
  let typeData;
  if (formValues.type === "mothers") {
    typeData = {
      user_type: "mother",
      motherData: {
        due_date: dueDate,
        hospital
      }
    };
  } else if (formValues.type === "drivers") {
    console.log("create driver record");
  } else if (formValues.type === "caregivers") {
    console.log("create mother record with caregiver info");
  } else {
    dispatch({
      type: onbrdTypes.ONBRD_FAIL,
      payload: { error: "incorrect user type" }
    });
  }
  // token should be set at this point by initOauth
  console.log("POST data: ", typeData);
  axios
    .post(`/api/users/onboard/${user.user.id}`, typeData)
    .then(res => {
      // POST to /api/users/onboard/id will create a mother/driver record (based on user.user.type) with form values
      // update the user record once it's done:
      // map formValues to api format:
      const userData = {
        user: {
          name,
          phone,
          user_type: type,
          address: description,
          village: town,
          email
        }
      };
      console.log("PUT data: ", userData);
      axios
        .put(`/api/users/update/${user.user.id}`, userData)
        .then(res => {
          console.log(`success updating user record: ${res.body}`);
        })
        .catch(err => {
          console.log("error updating user record: ", err);
          dispatch({
            type: onbrdTypes.ONBRD_FAIL,
            error: err
          });
        });
      const payload = {
        ...user,
        ...res.data
      };
      dispatch({
        type: onbrdTypes.ONBRD_SUCCESS,
        payload: payload
      });
    })
    .catch(err => {
      console.log(`error creating ${type} record: `, err);
      dispatch({
        type: onbrdTypes.ONBRD_FAIL,
        error: err
      });
    });
};

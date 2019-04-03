import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { TextMaskCustom } from "../Styling";
import "./onBoardingForm.css";

// import OnboardingSetLocation from "../../OnboardingComponents/OnboardingSetLocation";
// import OnboardingSetDestination from "../../OnboardingComponents/OnboardingSetDestination";
import OnboardingMotherMap from "../../OnboardingComponents/OnboardingMotherMap";

export default class OnBoardingForm extends Component {
  state = {
    route: {
      start: "",
      destination: ""
    }
  };

  constructor(props) {
    super(props);
    this.nameInp = React.createRef();
    this.phoneInp = React.createRef();
  }

  scrollToNextInputHandler = nextInp => {
    if (nextInp.current.type === "date") {
      nextInp.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    nextInp.current.focus({ preventScroll: true });
    nextInp.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  onPressEnterHandler = (e, nextInp) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      this.scrollToNextInputHandler(nextInp);
    }
  };

  submitForm = e => {
    e.preventDefault();
    const formValues = {
      type: "mothers",
      name: this.nameInp.current.value,
      phone: this.phoneInp.current.value,
      ...this.state
    };
    this.props.onSubmitForm(this.props.user, formValues);
  };

  // storeLatLng = latLng => {
  //   const latLngArr = latLng.split(",");
  //   this.setState(state => ({
  //     ...state,
  //     latitude: latLngArr[0],
  //     longitude: latLngArr[1]
  //   }));
  // };

  // storeDest = dest => {
  //   console.log("MotherForm destination: ", dest);
  //   this.setState(state => ({
  //     ...state,
  //     hospital: dest
  //   }));
  // };

  storeRoute = route => {
    console.log("MotherForm", route);
    this.setState({ route });
  };

  render() {
    return (
      <>
        {/* Set your location:
        <OnboardingSetLocation storeLatLng={this.storeLatLng} /> */}
        {/* Choose a Destination:
        <OnboardingSetDestination storeDest={this.storeDest} /> */}
        Plan your ride:
        <OnboardingMotherMap storeRoute={this.storeRoute} />
        <form onSubmit={this.submitForm}>
          <div className="inputHolder">
            <TextField
              autoFocus
              inputProps={{ pattern: "[a-zA-Z- ]+" }}
              label="Full Name"
              required
              inputRef={this.nameInp}
              fullWidth
              onKeyPress={e => this.onPressEnterHandler(e, this.phoneInp)}
            />
          </div>
          <div className="inputHolder">
            <TextField
              label="Phone Number"
              InputProps={{
                placeholder: "(  )    -    ",
                inputComponent: TextMaskCustom
              }}
              fullWidth
              inputRef={this.phoneInp}
              helperText="If you plan to use SMS to request transport this is required."
            />
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </div>
        </form>
      </>
    );
  }
}

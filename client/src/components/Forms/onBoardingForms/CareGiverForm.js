import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { TextMaskCustom } from "../Styling";
import { Button } from "@material-ui/core";
import "./onBoardingForm.css";

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
    this.caregiverNameInp = React.createRef();
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
      this.scrollToNextInputHandler(nextInp);
    }
  };

  submitForm = () => {
    const formValues = {
      type: "caregivers",
      caregiverName: this.caregiverNameInp.current.value,
      name: this.nameInp.current.value,
      phone: this.phoneInp.current.value,
      ...this.state
    };
    this.props.onSubmitForm(this.props.user, formValues);
  };

  storeRoute = route => {
    // console.log("CaregiverForm", route);
    this.setState({ route });
  };

  render() {
    return (
      <>
        Plan your ride:
        <OnboardingMotherMap storeRoute={this.storeRoute} />
        <div>
          <div className="inputHolder">
            <TextField
              autoFocus
              label="Full Name"
              required
              inputRef={this.caregiverNameInp}
              fullWidth
              helperText="Your Full Name"
              onKeyPress={e => this.onPressEnterHandler(e, this.nameInp)}
            />
          </div>
          <div className="inputHolder">
            <TextField
              label="Mother's Full Name"
              required
              inputRef={this.nameInp}
              fullWidth
              helperText="Mother's Full Name"
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
            <Button type="button" color="secondary" onClick={this.submitForm}>
              Submit
            </Button>
          </div>
        </div>
      </>
    );
  }
}

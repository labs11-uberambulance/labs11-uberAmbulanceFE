import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { TextMaskCustom } from "../Styling";
import { normalizePhone }  from './Styling';
import intlTelInput from 'intl-tel-input';
import "./onBoardingForm.css";

import OnboardingMotherMap from "../../OnboardingComponents/OnboardingMotherMap";

export default class OnBoardingForm extends Component {
  state = {
    route: {
      start: "",
      destination: ""
    },
    iti: null
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
    const countryData = this.state.iti.getSelectedCountryData();
    const { dialCode } = countryData
    const phone = normalizePhone(`+${dialCode}${this.phoneInp.current.value}`);
    const formValues = {
      type: "mothers",
      name: this.nameInp.current.value,
      phone,
      ...this.state
    };
    this.props.onSubmitForm(this.props.user, formValues);
  };

  storeRoute = route => {
    // console.log("MotherForm", route);
    this.setState({ route });
  };

  render() {
    return (
      <>
        Plan your ride:
        <OnboardingMotherMap storeRoute={this.storeRoute} />
        <form onSubmit={this.submitForm} style={{padding: "60px"}}>
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
              required
              label="Phone Number"
              InputProps={{
                placeholder: "(  )    -    ",
                inputComponent: TextMaskCustom,
                type: "tel",
                id: "phone"
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
  componentDidMount() {
    const iti = intlTelInput(this.phoneInp.current, {
      initialCountry: "ug"
    })
    this.setState({ iti })
  }
}

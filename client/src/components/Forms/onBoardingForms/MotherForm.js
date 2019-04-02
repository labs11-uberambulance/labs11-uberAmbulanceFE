import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { TextMaskCustom } from "../Styling";
import "./onBoardingForm.css";

import OnboardingSetDestination from "../../OnboardingComponents/OnboardingSetDestination";

export default class OnBoardingForm extends Component {
  state = {
    hospital: ""
  };
  constructor(props) {
    super(props);
    this.nameInp = React.createRef();
    this.emailInp = React.createRef();
    this.phoneInp = React.createRef();
    this.townInp = React.createRef();
    this.descInp = React.createRef();
    this.dueDateHolder = React.createRef();
    this.dueDateInp = React.createRef();
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
      this.storeFormValues();
      this.scrollToNextInputHandler(nextInp);
    }
  };
  submitForm = e => {
    e.preventDefault();
    this.props.onSubmitForm(this.storeFormValues());
  };
  storeFormValues = () => {
    const formValues = {
      type: "mothers",
      name: this.nameInp.current.value,
      email: this.emailInp.current.value,
      phone: this.phoneInp.current.value,
      town: this.townInp.current.value,
      description: this.descInp.current.value,
      dueDate: this.dueDateInp.current.value,
      hospital: this.state.hospital
    };
    // console.log("mother form values: ", formValues);
    this.props.storeFormValues(formValues);
    return formValues;
  };

  storeDest = dest => {
    console.log("MotherForm destination: ", dest);
    this.setState(
      state => ({
        hospital: dest
      }),
      this.storeFormValues
    );
  };

  render() {
    return (
      <>
        Choose a Destination:
        <OnboardingSetDestination storeDest={this.storeDest} />;
        <form onSubmit={this.submitForm}>
          <div className="inputHolder">
            <TextField
              autoFocus
              inputProps={{ pattern: "[a-zA-Z- ]+" }}
              label="Full Name"
              required
              inputRef={this.nameInp}
              fullWidth
              onKeyPress={e => this.onPressEnterHandler(e, this.emailInp)}
              onBlur={this.storeFormValues}
            />
            <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.emailInp)}
            >
              Next
            </Button>
          </div>
          <div className="inputHolder">
            <TextField
              label="Email"
              type="email"
              fullWidth
              inputRef={this.emailInp}
              onKeyPress={e => this.onPressEnterHandler(e, this.phoneInp)}
              onBlur={this.storeFormValues}
            />
            {this.emailInp.current === false && <p>We good</p>}
            <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.phoneInp)}
            >
              Next
            </Button>
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
              onKeyPress={e => this.onPressEnterHandler(e, this.townInp)}
              onBlur={this.storeFormValues}
              helperText="If you plan to use SMS to request transport this is required."
            />
            <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.townInp)}
            >
              Next
            </Button>
          </div>
          <div className="inputHolder">
            <TextField
              label="Nearest Town to Home"
              required
              fullWidth
              inputRef={this.townInp}
              onKeyPress={e => this.onPressEnterHandler(e, this.descInp)}
              onBlur={this.storeFormValues}
            />
            <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.descInp)}
            >
              Next
            </Button>
          </div>
          <div className="inputHolder">
            <TextField
              label="Further description to destination"
              required
              fullWidth
              multiline
              rows="4"
              inputRef={this.descInp}
              onBlur={this.storeFormValues}
            />
            <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.dueDateHolder)}
            >
              Next
            </Button>
          </div>
          <div className="inputHolder" ref={this.dueDateHolder}>
            <TextField
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputRef={this.dueDateInp}
              onBlur={this.storeFormValues}
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

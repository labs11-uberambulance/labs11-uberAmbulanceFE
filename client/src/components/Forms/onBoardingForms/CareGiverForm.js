import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { TextMaskCustom } from "../Styling";
import { Button } from "@material-ui/core";
import "./onBoardingForm.css";

import OnboardingSetLocation from "../../OnboardingComponents/OnboardingSetLocation";
import OnboardingSetDestination from "../../OnboardingComponents/OnboardingSetDestination";

export default class OnBoardingForm extends Component {
  state = {
    hospital: "",
    latitude: 0,
    longitude: 0
  };
  constructor(props) {
    super(props);
    this.nameInp = React.createRef();
    this.caregiverNameInp = React.createRef();
    // this.emailInp = React.createRef();
    this.phoneInp = React.createRef();
    // this.townInp = React.createRef();
    // this.descInp = React.createRef();
    // this.dueDateHolder = React.createRef();
    // this.dueDateInp = React.createRef();
  }

  // scrollToNextInputHandler = nextInp => {
  //   if (nextInp.current.type === "date") {
  //     nextInp.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  //   nextInp.current.focus({ preventScroll: true });
  //   nextInp.current.scrollIntoView({ behavior: "smooth", block: "center" });
  // };
  // onPressEnterHandler = (e, nextInp) => {
  //   if (e.key === "Enter") {
  //     this.scrollToNextInputHandler(nextInp);
  //   }
  // };

  submitForm = () => {
    const formValues = {
      type: "caregivers",
      caregiverName: this.caregiverNameInp.current.value,
      name: this.nameInp.current.value,
      // email: this.emailInp.current.value,
      phone: this.phoneInp.current.value,
      // town: this.townInp.current.value,
      // description: this.descInp.current.value,
      // dueDate: this.dueDateInp.current.value,
      ...this.state
    };
    this.props.onSubmitForm(this.props.user, formValues);
  };

  // storeFormValues = () => {
  //   this.props.storeFormValues(formValues);
  //   return formValues;
  // };

  storeLatLng = latLng => {
    const latLngArr = latLng.split(",");
    this.setState(state => ({
      ...state,
      latitude: latLngArr[0],
      longitude: latLngArr[1]
    }));
  };

  storeDest = dest => {
    console.log("CareGivForm destination: ", dest);
    this.setState(state => ({
      ...state,
      hospital: dest
    }));
  };
  render() {
    return (
      <>
        {/* Set your location:
        <OnboardingSetLocation storeLatLng={this.storeLatLng} /> */}
        Choose a Destination:
        <OnboardingSetDestination storeDest={this.storeDest} />;
        <div>
          <div className="inputHolder">
            <TextField
              autoFocus
              label="Full Name"
              required
              inputRef={this.caregiverNameInp}
              fullWidth
              // onKeyPress={e => this.onPressEnterHandler(e, this.nameInp)}
              // onBlur={this.storeFormValues}
              helperText="Your Full Name"
            />
            {/* <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.nameInp)}
            >
              Next
            </Button> */}
          </div>
          <div className="inputHolder">
            <TextField
              label="Mother's Full Name"
              required
              inputRef={this.nameInp}
              fullWidth
              // onKeyPress={e => this.onPressEnterHandler(e, this.emailInp)}
              // onBlur={this.storeFormValues}
              helperText="Mother's Full Name"
            />
            {/* <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.emailInp)}
            >
              Next
            </Button> */}
          </div>
          {/* <div className="inputHolder">
            <TextField
              label="Email"
              fullWidth
              inputRef={this.emailInp}
              onKeyPress={e => this.onPressEnterHandler(e, this.phoneInp)}
              onBlur={this.storeFormValues}
            />
            <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.phoneInp)}
            >
              Next
            </Button>
          </div> */}
          <div className="inputHolder">
            <TextField
              label="Phone Number"
              InputProps={{
                placeholder: "(  )    -    ",
                inputComponent: TextMaskCustom
              }}
              fullWidth
              inputRef={this.phoneInp}
              // onKeyPress={e => this.onPressEnterHandler(e, this.townInp)}
              // onBlur={this.storeFormValues}
              helperText="If you plan to use SMS to request transport this is required."
            />
            <Button type="button" color="secondary" onClick={this.submitForm}>
              Submit
            </Button>
            {/* <Button
              type="button"
              onClick={() => this.scrollToNextInputHandler(this.townInp)}
            >
              Next
            </Button> */}
          </div>
          {/* <div className="inputHolder">
            <TextField
              label="Nearest town to pick-up destination"
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
              label="Further description to pick-up destination"
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
            
          </div> */}
        </div>
      </>
    );
  }
}

import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  withMobileDialog
} from "@material-ui/core";
import { TextMaskCustom } from "../Styling";
import { normalizePhone } from "./Styling";
import intlTelInput from "intl-tel-input";
import "./onBoardingForm.css";
import "./MotherForm.css";
import OnboardingSetLocation from "../../OnboardingComponents/OnboardingSetLocation";

class OnBoardingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { latlng: "" },
      iti: null,
      caregiverName: "",
      name: "",
      phone: "",
      open: false,
      pass: false
    };
    this.nameInp = React.createRef();
    this.phoneInp = React.createRef();
    this.caregiverNameInp = React.createRef();
  }

  onPressEnterHandler = (e, nextInp) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      nextInp.current.focus();
    }
  };
  submitForm = e => {
    e.preventDefault();
    const countryData = this.state.iti.getSelectedCountryData();
    const { dialCode } = countryData;
    const phone = normalizePhone(`+${dialCode}${this.phoneInp.current.value}`);
    const formValues = {
      type: "caregivers",
      caregiverName: this.caregiverNameInp.current.value,
      name: this.nameInp.current.value,
      phone,
      route: { start: { ...this.state.location } }
    };
    this.props.onSubmitForm(this.props.user, formValues);
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  storeLatLng = latLng => {
    this.setState({ location: { latlng: latLng }, open: false });
  };

  render() {
    if (this.props.user.user_type === "mothers") {
      this.props.redirOnSuccess("/mothers");
    }
    return (
      <>
        <form onSubmit={this.submitForm} className="mother-form--container">
          <h2 className="mother-form--title">Caregiver Registration</h2>
          <main className="mother-form--inputs">
            <TextField
              autoFocus
              inputProps={{ pattern: "[a-zA-Z- ]+" }}
              required
              fullWidth
              label="Your Full Name"
              inputRef={this.caregiverNameInp}
              value={this.state.caregiverName}
              onKeyPress={e => this.onPressEnterHandler(e, this.nameInp)}
              onChange={e => {
                this.setState({ caregiverName: e.target.value });
              }}
            />
            <TextField
              inputProps={{ pattern: "[a-zA-Z- ]+" }}
              required
              fullWidth
              label="Mother's Full Name"
              inputRef={this.nameInp}
              value={this.state.name}
              onKeyPress={e => this.onPressEnterHandler(e, this.phoneInp)}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
            <TextField
              required
              label="Phone Number"
              fullWidth
              inputRef={this.phoneInp}
              value={this.state.phone}
              InputProps={{
                placeholder: "(  )    -    ",
                inputComponent: TextMaskCustom,
                type: "tel",
                id: "phone"
              }}
              helperText="When you place a ride we'll update you here."
              onChange={e => {
                this.setState({ phone: e.target.value });
              }}
            />
            <section className="mother-form--address">
              <Typography align="center" component="p">
                Would you like to save a default address now?
              </Typography>
              <div className="mother-form-add-buttons">
                <Button
                  color="secondary"
                  className="mother-form-add-yes"
                  onClick={this.handleClickOpen}
                >
                  Yes
                </Button>
                <Button
                  color="secondary"
                  className="mother-form-add-no"
                  onClick={() => {
                    this.setState({ pass: true });
                  }}
                >
                  No
                </Button>
              </div>
            </section>
            <Button
              disabled={
                !this.state.name ||
                !this.state.phone ||
                (!this.state.location.latlng && !this.state.pass)
              }
              type="submit"
              color="secondary"
              className="mother-form--button-submit"
            >
              Submit
            </Button>
          </main>
        </form>
        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Set your location:{" "}
          </DialogTitle>
          <DialogContent>
            <OnboardingSetLocation
              storeLatLng={latLng => this.storeLatLng(latLng)}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }
  componentDidMount() {
    const iti = intlTelInput(this.phoneInp.current, {
      initialCountry: "ug"
    });
    this.setState({ iti });
  }
}

export default withMobileDialog()(OnBoardingForm);

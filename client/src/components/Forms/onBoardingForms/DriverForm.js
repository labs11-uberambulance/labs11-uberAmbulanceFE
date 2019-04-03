import React, { Component } from "react";
import firebase from "../../../firebase";
import TextField from "@material-ui/core/TextField";
import { TextMaskCustom } from "../Styling";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import "./onBoardingForm.css";

import OnboardingSetLocation from "../../OnboardingComponents/OnboardingSetLocation";

export default class OnBoardingForm extends Component {
  constructor(props) {
    super(props);
    this.nameInp = React.createRef();
    this.emailInp = React.createRef();
    this.phoneInp = React.createRef();
    this.addressInp = React.createRef();
    this.photoInp = React.createRef();
    this.rateForScroll = React.createRef();
    this.state = {
      file: null,
      rateInp: "",
      latitude: 0,
      longitude: 0
    };
  }

  submitForm = async () => {
    const image = this.state.file;
    const storageRef = firebase
      .storage()
      .ref(
        `profile_images/${this.props.user.fireBId}@${new Date().toISOString()}`
      );
    const uploadTask = storageRef.put(image, { contentType: image.type });
    return uploadTask.on(
      "state_changed",
      snapshot => {
        //if we wont handle progress change .on() to .then()
        // handle progress here
      },
      error => {
        // Handle unsuccessful uploads here
      },
      () => {
        return uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const formValues = {
            type: "drivers",
            name: this.nameInp.current.value,
            email: this.emailInp.current.value,
            phone: this.phoneInp.current.value,
            rate: this.rateForScroll.current.value,
            imageURL: downloadURL,
            latitude: this.state.latitude,
            longitude: this.state.longitude
          };
          this.props.onSubmitForm(this.props.user, formValues);
        });
      }
    );
  };

  storeLatLng = latLng => {
    const latLngArr = latLng.split(",");
    this.setState(state => ({
      ...state,
      latitude: latLngArr[0],
      longitude: latLngArr[1]
    }));
  };

  render() {
    return (
      <div>
        <div className="inputHolder">
          <TextField
            autoFocus
            label="Full Name"
            required
            inputRef={this.nameInp}
            fullWidth
          />
        </div>
        <div className="inputHolder">
          <TextField
            label="Email"
            required
            fullWidth
            inputRef={this.emailInp}
          />
        </div>
        <div className="inputHolder">
          <TextField
            label="Phone Number"
            required
            InputProps={{
              placeholder: "(  )    -    ",
              inputComponent: TextMaskCustom
            }}
            fullWidth
            inputRef={this.phoneInp}
            helperText="This will be the number that mothers will use to contact you."
          />
        </div>
        Set your location:
        <OnboardingSetLocation storeLatLng={this.storeLatLng} />
        <Button
          type="button"
          color="primary"
          onClick={() => this.photoInp.current.click()}
        >
          {this.state.file ? `${this.state.file.name}` : "Set Profile Image *"}
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          ref={this.photoInp}
          onChange={this.fileUploadHandler}
        />
        <br />
        <br />
        <div className="inputHolder" style={{ paddingTop: "0" }}>
          <TextField
            label="Rate per 10km"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            inputRef={this.rateForScroll}
            value={this.state.rateInp}
            onChange={e => {
              this.setState({ rateInp: e.target.value });
            }}
            helperText={`We recommend $2${
              this.state.rateInp !== ""
                ? `, you pledge to never charge more than $${
                    this.state.rateInp
                  } per 10km.`
                : "."
            }`}
          />
          <Button type="button" color="secondary" onClick={this.submitForm}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
  fileUploadHandler = e => {
    e.persist();
    this.setState(prevState => {
      if (prevState.file && e.target.files.length === 0) return;
      return { file: e.target.files[0] };
    });
  };
}

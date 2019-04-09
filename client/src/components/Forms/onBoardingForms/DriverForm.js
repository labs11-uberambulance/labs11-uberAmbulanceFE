import React, { Component } from "react";
import firebase from "../../../firebase";
import TextField from "@material-ui/core/TextField";
import { TextMaskCustom } from "../Styling";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import "./onBoardingForm.css";

import DriverSetLocModal from "./DriverSetLocModal";

export default class OnBoardingForm extends Component {
  constructor(props) {
    super(props);
    this.nameInp = React.createRef();
    this.phoneInp = React.createRef();
    this.addressInp = React.createRef();
    this.photoInp = React.createRef();
    this.rateForScroll = React.createRef();
    this.state = {
      file: null,
      rateInp: "",
      location: {
        latlng: ""
      }
    };
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

  storeLatLng = latLng => {
    this.setState(state => ({
      ...state,
      location: {
        latlng: latLng
      }
    }));
  };

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
            phone: this.phoneInp.current.value,
            rate: this.rateForScroll.current.value,
            imageURL: downloadURL,
            location: this.state.location
          };
          this.props.onSubmitForm(this.props.user, formValues);
        });
      }
    );
  };

  render() {
    console.log("DriverForm Render: ", this.state.location.latlng);
    return (
      <div>
        <div className="inputHolder">
          <TextField
            autoFocus
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
            required
            InputProps={{
              placeholder: "(  )    -    ",
              inputComponent: TextMaskCustom
            }}
            fullWidth
            inputRef={this.phoneInp}
            onKeyPress={e => this.onPressEnterHandler(e, this.photoInp)}
            helperText="This will be the number that mothers will use to contact you."
          />
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
          </div>
        </div>
        <DriverSetLocModal storeLatLng={this.storeLatLng} />
        <p
          style={{
            color: "red",
            display: this.state.location.latlng && "none"
          }}
        >
          Required
        </p>
        <Button
          type="button"
          color="primary"
          onClick={() => this.photoInp.current.click()}
        >
          {this.state.file ? `${this.state.file.name}` : "Set Profile Image *"}
        </Button>
        <p style={{ color: "red", display: this.state.file && "none" }}>
          Required
        </p>
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          ref={this.photoInp}
          onChange={this.fileUploadHandler}
        />
        <br />
        <Button
          disabled={!this.state.file || !this.state.location.latlng}
          type="button"
          color="secondary"
          onClick={this.submitForm}
        >
          Submit
        </Button>
      </div>
    );
  }
  fileUploadHandler = e => {
    e.persist();
    this.setState(prevState => {
      if (prevState.file && e.target.files.length === 0) return;
      return { file: e.target.files[0] };
    }, this.scrollToNextInputHandler(this.rateForScroll));
  };
}

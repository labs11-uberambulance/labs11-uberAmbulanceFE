import React, { Component } from "react";
import firebase, { messaging } from "../../../firebase";
import axios from '../../../axios-instance';
import {TextField } from "@material-ui/core";
import { normalizePhone } from './Styling';
import { TextMaskCustom } from "../Styling";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import intlTelInput from 'intl-tel-input';
import "./onBoardingForm.css";
import "./DriverForm.css";

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
      },
      notificationsOn: false,
      iti: null
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
  requestPushNotificationsPermission = () => {
    messaging.requestPermission().then((result) => {
      return messaging.getToken();
    }).then(token => {
      this.setState({ notificationsOn: true })
      return axios.post('/api/notifications/refresh-token', {token});
    }).catch(err => {
      console.error(err.message);
      this.setState({ notificationsOn: false })
      return axios.post('/api/notifications/refresh-token', {token: false});
    })
  }
  storeLatLng = latLng => {
    this.setState(state => ({
      ...state,
      location: {
        latlng: latLng
      }
    }));
  };

  submitForm = async () => {
    const countryData = this.state.iti.getSelectedCountryData();
    const { dialCode } = countryData
    const phone = normalizePhone(`+${dialCode}${this.phoneInp.current.value}`);
    const image = this.state.file;
    const storageRef = firebase
      .storage()
      .ref(
        `profile_images/${this.props.user.fireBId}@${new Date().toISOString()}`
      );
    const uploadTask = storageRef.put(image, { contentType: image.type });
    return uploadTask.then(() => {
        return uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const formValues = {
            type: "drivers",
            name: this.nameInp.current.value, phone,
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
    const requiredBtn = { backgroundColor: "#9e9e9e", color: "white" }
    const setBtn = { backgroundColor: "#03a9f4", color: "white" }
    const { file, location, notificationsOn } = this.state;
    return (
      <div className="driver-form--container">
        <h2 className="driver-form--title">Driver Registration</h2>
        <main className="driver-form--main">
        <section className="driver-form--inputs">
          <TextField autoFocus label="Full Name" required inputRef={this.nameInp} onKeyPress={e => this.onPressEnterHandler(e, this.phoneInp)} />
          <TextField label="Phone Number" required
            InputProps={{ placeholder: "(  )    -    ", inputComponent: TextMaskCustom, type: "tel", id: "phone" }}
            inputRef={this.phoneInp} onKeyPress={e => this.onPressEnterHandler(e, this.photoInp)}
            helperText="This will be the number that mothers will use to contact you."
          />
          <TextField label="Rate per 10km" required
              InputProps={{ startAdornment: ( <InputAdornment position="start">$</InputAdornment> ) }}
              inputRef={this.rateForScroll} value={this.state.rateInp}
              onChange={e => { this.setState({ rateInp: e.target.value }); }}
              helperText='We recommend $2'
          />
        </section>
        <section className="driver-form--buttons" style={(!file || !notificationsOn || !location.latlng) ? {border: "1px solid #b71c1c"} : {border: "1px solid green"} }>
          <DriverSetLocModal isSet={!!location.latlng} storeLatLng={this.storeLatLng} />
          <Button type="button" style={!file ? requiredBtn : setBtn} onClick={() => this.photoInp.current.click()} >
            {this.state.file ? `${this.state.file.name.slice(0, 10)}...` : "Save Profile Image"}
          </Button>
          <Button type="button" style={!notificationsOn ? requiredBtn : setBtn}  onClick={this.requestPushNotificationsPermission} >
            Enable Notification
          </Button>
        </section>
        </main>
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          ref={this.photoInp}
          onChange={this.fileUploadHandler}
        />
        <br />
        <Button
          disabled={!file || !location.latlng || !notificationsOn}
          type="button" color="secondary" className="driver-form--button-submit" onClick={this.submitForm}
        >Submit</Button>
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
  componentDidMount() {
    const iti = intlTelInput(this.phoneInp.current, {
      initialCountry: "ug"
    })
    this.setState({ iti })
  }
}

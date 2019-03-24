import React, { Component } from "react";
import { connect } from "react-redux";
import firebase, { auth, googleProvider } from "../../firebase";
import actions from "../../store/actions";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import gIcon from "../../assests/images/btn_google_light_normal_ios.svg";
import { modalCode, normalizePhone } from "./Styling";
import { TextMaskCustom } from "./Styling";

class OauthForm extends Component {
  initOauthWithGoogle = () => {
    this.setState({ usingPhone: false, phoneNumber: "" });
    auth.signInWithPopup(googleProvider).then(result => {
      const { uid, email, photoURL, ra } = result.user;
      const registerUser = { firebaseId: uid, email, photoURL, token: ra };
      this.props.onRegisterUser(registerUser);
    });
  };

  initOauthWithPhone = e => {
    e.preventDefault();
    const appVerifier = window.recaptchaVerifier;
    const firebaseNumber = normalizePhone(`+1${this.state.phoneNumber}`);
    if (!firebaseNumber) {
      this.setState({
        phoneNumber: "",
        errorMessage: "invalid phone number pattern"
      });
    }
    auth
      .signInWithPhoneNumber(firebaseNumber, appVerifier)
      .then(confirmationResult => {
        this.setState({
          confirmationFunc: confirmationResult,
          verifyCode: true
        });
      });
  };

  onSubmitCodeForConfirmation = e => {
    e.preventDefault();
    this.state.confirmationFunc.confirm(this.state.inputCode).then(result => {
      const { uid, phoneNumber } = result.user;
      const registerUser = { firebaseId: uid, phoneNumber };
      this.props.onRegisterUser(registerUser);
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.initOauthWithPhone}>
          <Button onClick={this.initOauthWithGoogle} type="button">
            <img src={gIcon} alt="G" style={{ marginRight: "5px" }} /> Sign in
            with Google
          </Button>
          <br />
          {!this.state.usingPhone && (
            <Button
              onClick={() => {
                this.setState(prevState => ({
                  usingPhone: !prevState.usingPhone
                }));
              }}
              type="button"
            >
              Sign in with Phone
            </Button>
          )}
          {this.state.usingPhone && (
            <TextField
              required
              value={this.state.phoneNumber}
              InputProps={{
                placeholder: "(  )    -    ",
                inputComponent: TextMaskCustom
              }}
              name="phoneNumber"
              onBlur={() => {
                this.setState(prevState => ({
                  usingPhone: !prevState.usingPhone
                }));
              }}
              onChange={this.inputChangeHandler}
            />
          )}
        </form>
        {this.state.verifyCode && (
          <Modal open={this.state.verifyCode}>
            <form style={modalCode} onSubmit={this.onSubmitCodeForConfirmation}>
              <Typography variant="h6" id="modal-title">
                Enter Code
              </Typography>
              <Input
                value={this.state.inputCode}
                name="inputCode"
                onChange={this.inputChangeHandler}
              />
              <br />
              <br />
              <Button
                type="button"
                color="secondary"
                onClick={() => {
                  this.setState({
                    confirmationFunc: null,
                    verifyCode: false,
                    inputCode: ""
                  });
                }}
              >
                Cancel
              </Button>
            </form>
          </Modal>
        )}
        <div id="sign-captcha" />
      </>
    );
  }
  state = {
    usingPhone: false,
    phoneNumber: "",
    confirmationFunc: null,
    verifyCode: false,
    inputCode: "",
    errorMessage: null
  };
  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  componentDidMount = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-captcha",
      { size: "invisible" }
    );
  };
  componentWillUnmount = () => {
    window.recaptchaVerifier = null;
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: user => dispatch(actions.auth.initOauth(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OauthForm);

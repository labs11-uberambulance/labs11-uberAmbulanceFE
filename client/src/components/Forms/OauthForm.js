import React, { Component } from "react";
import { connect } from "react-redux";
import firebase, { auth, googleProvider } from "../../firebase";
import intlTelInput from "intl-tel-input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import gIcon from "../../assests/images/btn_google_light_normal_ios.svg";
import pIcon from "../../assests/images/btn_phone_light.svg";
import { modalCode, normalizePhone } from "./Styling";
import { TextMaskCustom } from "./Styling";
import "./OauthForm.css";

class OauthForm extends Component {
  initOauthWithGoogle = () => {
    this.setState({
      usingGmail: true,
      usingEmail: false,
      usingPhone: false,
      phoneNumber: ""
    });
    auth.signInWithPopup(googleProvider).catch(err => console.error(err));
  };

  chooseEmail = () => {
    this.setState({
      usingEmail: true,
      usingGoogle: false,
      usingPhone: false,
      phoneNumber: ""
    });
  };
  createEmailPasswordAccount = () => {
    const email = this.emailInp.current.value;
    const password = this.passwordInp.current.value;
    this.emailInp.current.value = "";
    this.passwordInp.current.value = "";
    if (!email || !password) return;
    auth.createUserWithEmailAndPassword(email, password).catch(err => {
      console.log(err);
    });
  };
  signInEmailPassword = () => {
    const email = this.emailInp.current.value;
    const password = this.passwordInp.current.value;
    this.emailInp.current.value = "";
    this.passwordInp.current.value = "";
    if (!email || !password) return;
    auth.signInWithEmailAndPassword(email, password).catch(err => {
      console.log(err);
    });
  };
  choosePhone = () => {
    this.setState({
      usingPhone: true,
      usingEmail: false,
      usingGoogle: false,
      phoneNumber: ""
    });
  };
  initOauthWithPhone = e => {
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
    this.state.confirmationFunc
      .confirm(this.state.inputCode)
      .catch(err => console.error(err));
  };
  render() {
    const path = this.props.signup ? "/login" : "/register";
    return (
      <div className="authentication-background">
        <form className="auth-form">
          {/* Using Email:  */}
          {this.state.usingEmail && (
            <div className="manual-auth">
              <TextField
                autoFocus
                type="email"
                fullWidth
                required
                inputRef={this.emailInp}
                label="Email"
              />
              <br />
              <TextField
                fullWidth
                type="password"
                required
                inputRef={this.passwordInp}
                label="Password"
              />
              <Button
                type="button"
                className="login-button"
                color="primary"
                onClick={
                  this.props.signup
                    ? this.createEmailPasswordAccount
                    : this.signInEmailPassword
                }
              >
                {this.props.signup ? "Sign up " : "Log in "}
              </Button>
            </div>
          )}
          {!this.state.usingEmail && (
            <Button onClick={this.chooseEmail} type="button" color="secondary">
              {this.props.signup ? "Sign up " : "Log in "}
              with Email
            </Button>
          )}
          <Button
            onClick={this.initOauthWithGoogle}
            type="button"
            className="google-button"
          >
            <img src={gIcon} alt="G" style={{ marginRight: "5px" }} />{" "}
            {this.props.signup ? "Sign up " : "Log in "}
            with Google
          </Button>
          <br />
          {!this.state.usingPhone && (
            <Button
              onClick={this.choosePhone}
              className="phone-button"
              type="button"
              color="secondary"
            >
              <img src={pIcon} alt="Phone" style={{ marginRight: "5px" }} />
              {this.props.signup ? "Sign up " : "Log in "} with Phone
            </Button>
          )}
          {/* Using Phone: */}
          <TextField
            required
            value={this.state.phoneNumber}
            style={
              this.state.usingPhone
                ? { marginLeft: "0" }
                : { width: "0px", opacity: "0" }
            }
            inputRef={this.phoneInp}
            InputProps={{
              placeholder: "(  )    -    ",
              inputComponent: TextMaskCustom,
              type: "tel",
              id: "phone"
            }}
            name="phoneNumber"
            onBlur={() => {
              this.setState(prevState => ({
                usingPhone: !prevState.usingPhone,
                phoneNumber: ""
              }));
            }}
            onKeyPress={e => {
              e.key === "Enter" && this.initOauthWithPhone();
            }}
            onChange={this.inputChangeHandler}
          />
          {this.state.usingPhone && (
            <Button color="secondary" onClick={this.initOauthWithPhone}>
              {this.props.signup ? "Sign up " : "Log in "} with Phone
            </Button>
          )}
          <br />
          <br />
          <Button
            onClick={() => {
              this.props.history.replace(path);
            }}
          >
            {!this.props.signup ? "Switch to Sign up " : "Switch to Log in "}
          </Button>
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
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      usingPhone: false,
      phoneNumber: "",
      confirmationFunc: null,
      verifyCode: false,
      inputCode: "",
      errorMessage: null,
      usingGmail: false,
      usingEmail: false
    };
    this.phoneInp = React.createRef();
    this.emailInp = React.createRef();
    this.passwordInp = React.createRef();
  }

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  componentDidMount = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-captcha",
      { size: "invisible" }
    );
    const iti = intlTelInput(this.phoneInp.current, { initialCountry: "ug" });
    this.setState({ iti });
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

export default connect(mapStateToProps)(OauthForm);

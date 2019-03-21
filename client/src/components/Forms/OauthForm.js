import React, { Component } from 'react'
import firebase, { auth, googleProvider } from '../../firebase';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import gIcon from '../../assests/images/btn_google_light_normal_ios.svg';
import { modalCode } from './Styling';


class OauthForm extends Component {

  initOauthWithGoogle = () => {
    this.setState({ usingPhone: false, phoneNumber: ''})
      auth.signInWithPopup(googleProvider).then((result) => {
          const user = result.user;
          console.log(user)
        });
  }

  initOauthWithPhone = (e) => {
    e.preventDefault()
    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(this.state.phoneNumber, appVerifier).then(confirmationResult => {
      this.setState({ confirmationFunc: confirmationResult, verifyCode: true })
    })
  }

  onSubmitCodeForConfirmation = (e) => {
    e.preventDefault()
    this.state.confirmationFunc.confirm(this.state.inputCode).then(result => {
      console.log(result)
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.initOauthWithPhone}>
            <Button onClick={this.initOauthWithGoogle} type="button"> 
                <img src={gIcon} alt="G" style={{marginRight: "5px"}} /> Sign in with Google
            </Button>
            <br />
            {!this.state.usingPhone && <Button onClick={() => {this.setState(prevState => ({ usingPhone: !prevState.usingPhone }))}} type="button"> 
                Sign in with Phone
            </Button>}
            {this.state.usingPhone && 
            <Input
              value={this.state.phoneNumber}
              onBlur={() => {this.setState(prevState => ({ usingPhone: !prevState.usingPhone }))}}
              name="phoneNumber"
              onChange={this.inputChangeHandler}
            />}
        </form>
        { this.state.verifyCode && 
        <Modal open={this.state.verifyCode}>
          <form style={modalCode} onSubmit={this.onSubmitCodeForConfirmation}>
            <Typography variant="h6" id="modal-title">Enter Code</Typography>
            <Input value={this.state.inputCode} name="inputCode" onChange={this.inputChangeHandler} />
            <br />
            <br />
            <Button type="button" color="secondary" onClick={() => {this.setState({confirmationFunc: null, verifyCode: false})}}>Cancel</Button>
          </form>
        </Modal>}
        <div id="sign-captcha"></div>
      </>
    )
  }
  state = {
    usingPhone: false,
    phoneNumber: '',
    confirmationFunc: null,
    verifyCode: false,
    inputCode: ''
  }
  inputChangeHandler = (e) => {
    // const pattern = /^[0-9]*$/;
    const { name, value } = e.target;
    // if (!pattern.test(value)) return;
    this.setState({[name]: value})
  }
  componentDidMount = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-captcha', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response)
      }
    });
  }
  componentWillUnmount = () => {
    window.recaptchaVerifier = null;
  }
}

export default OauthForm

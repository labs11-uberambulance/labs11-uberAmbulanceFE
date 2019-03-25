import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import { TextMaskCustom } from '../Styling';
import InputAdornment from '@material-ui/core/InputAdornment'
import { Button } from '@material-ui/core';
import './onBoardingForm.css'


export default class OnBoardingForm extends Component {
    constructor(props) {
        super(props)
        this.nameInp = React.createRef();
        this.emailInp = React.createRef();
        this.phoneInp = React.createRef();
        this.addressInp = React.createRef();
        this.rateInp = React.createRef();
    }

    scrollToNextInputHandler = (nextInp) => {
        nextInp.current.focus({ preventScroll: true })
        nextInp.current.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    onPressEnterHandler = (e, nextInp) => {
        if (e.key === 'Enter') {
            nextInp.current.focus({ preventScroll: true })
            nextInp.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }
    submitForm = () => {
        const formValues = {
            type: 'drivers',
            name: this.nameInp.current.value,
            email: this.emailInp.current.value,
            phone: this.phoneInp.current.value,
            address: this.addressInp.current.value,
            rate: this.rateInp.current.value
        }
        console.log(formValues)
    }
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
                onKeyPress={(e) => this.onPressEnterHandler(e, this.emailInp)}
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.emailInp)}>Next</Button>
        </div>
        <div className="inputHolder" >
            <TextField
                label="Email"
                required
                fullWidth
                inputRef={this.emailInp}
                onKeyPress={(e) => this.onPressEnterHandler(e, this.phoneInp)}
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.phoneInp)}>Next</Button>
        </div>
        <div className="inputHolder">
            <TextField
              label="Phone Number"
              required
              InputProps={{placeholder:'(  )    -    ', inputComponent:TextMaskCustom}}
              fullWidth
              inputRef={this.phoneInp}
              onKeyPress={(e) => this.onPressEnterHandler(e, this.addressInp)}
              helperText="This will be the number that mothers will use to contact you."
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.addressInp)}>Next</Button>
        </div>
        <div className="inputHolder">
            <TextField
              label="Address"
              required
              fullWidth
              inputRef={this.addressInp}
              onKeyPress={(e) => this.onPressEnterHandler(e, this.rateInp)}
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.rateInp)}>Next</Button>
        </div>
        <div className="inputHolder">
            <TextField
              label="Rate per 10km"
              required
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              inputRef={this.rateInp}
              helperText="We recommend $2, you pledge to never charge more."
            />
            <Button type="button" color="secondary" onClick={this.submitForm}>Submit</Button>
        </div>
      </div>
    )
  }
}

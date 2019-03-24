import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import { TextMaskCustom } from '../Styling';
import { Button } from '@material-ui/core';
import './onBoardingForm.css'


export default class OnBoardingForm extends Component {
    constructor(props) {
        super(props)
        this.nameInp = React.createRef();
        this.emailInp = React.createRef();
        this.phoneInp = React.createRef();
        this.townInp = React.createRef();
        this.descInp = React.createRef();
        this.dueDateHolder = React.createRef();
        this.dueDateInp = React.createRef();
    }

    scrollToNextInputHandler = (nextInp) => {
        if (nextInp.current.type === 'date') {
            nextInp.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        nextInp.current.focus({ preventScroll: true })
        nextInp.current.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    onPressEnterHandler = (e, nextInp) => {
        if (e.key === 'Enter') {
            this.scrollToNextInputHandler(nextInp)
        }
    }
    submitForm = () => {
        const formValues = {
            type: 'caregivers',
            name: this.nameInp.current.value,
            email: this.emailInp.current.value,
            phone: this.phoneInp.current.value,
            town: this.townInp.current.value,
            description: this.descInp.current.value,
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
                helperText="Your Full Name"
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.emailInp)}>Next</Button>
        </div>
        <div className="inputHolder" >
            <TextField
                label="Email"
                fullWidth
                inputRef={this.emailInp}
                onKeyPress={(e) => this.onPressEnterHandler(e, this.phoneInp)}
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.phoneInp)}>Next</Button>
        </div>
        <div className="inputHolder">
            <TextField
              label="Phone Number"
              InputProps={{placeholder:'(  )    -    ', inputComponent:TextMaskCustom}}
              fullWidth
              inputRef={this.phoneInp}
              onKeyPress={(e) => this.onPressEnterHandler(e, this.townInp)}
              helperText="If you plan to use SMS to request transport this is required."
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.townInp)}>Next</Button>
        </div>
        <div className="inputHolder">
            <TextField
              label="Nearest town to pick-up destination"
              required
              fullWidth
              inputRef={this.townInp}
              onKeyPress={(e) => this.onPressEnterHandler(e, this.descInp)}
            />
            <Button type="button" onClick={() => this.scrollToNextInputHandler(this.descInp)}>Next</Button>
        </div>
        <div className="inputHolder">
            <TextField
              label="Further description to pick-up destination"
              required
              fullWidth
              multiline
              rows="4"
              inputRef={this.descInp}
            />
            <Button type="button" color="secondary" onClick={this.submitForm}>Submit</Button>
        </div>
      </div>
    )
  }
}
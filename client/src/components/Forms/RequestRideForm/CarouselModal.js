import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RequestButtons from './requestButtons.js';
import Dropoff from './DropOff.js';
import Pickup from './Pickup.js';
import SelectDriver from './SelectDriver';
import Completed from './Confirmation.js';




const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Request a Ride', 'Set Pickup ', 'Set Dropoff', 'Select Driver', 'Completed'];



class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      activeStep: 0,
      orderRide: false,
      origin: null,
      destination: null,
    }
  }
   getStepContent = (step)=> {
    switch (step) {
      case 0:
        return <RequestButtons handleNext={this.handleNext}/>;
      case 1:
        return <Pickup 
        setOrigin={this.setOrigin}
        handleNext={this.handleNext}
        />;
      case 2:
        return <Dropoff
        setDestination={this.setDestination}
        />;
      case 3:
        return <SelectDriver />;
      case 4:
        return <Completed />;
      default:
        throw new Error('Unknown step');
    }
  }
  setOrigin = incoming => {
    this.setState({origin: incoming})
    this.handleNext()
  }
  setDestination = incoming => {
    this.setState({
      destination: incoming,
      orderRide: true,
    })
    this.handleNext()
  }
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <>
        <CssBaseline />
        {/* <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              BirthRide
            </Typography>
          </Toolbar>
        </AppBar> */}
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Find a Ride
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your Requesting a ride! .
                  </Typography>
                  <Typography variant="subtitle1">
                  We'll take the rest from here, please stay close to your phone for updates!
                  </Typography>
                </>
              ) : (
                <>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </>
              )}
            </>
          </Paper>
        </main>
      </>
    );
  }
}



export default withStyles(styles)(Checkout);

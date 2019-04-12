import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const tutorialSteps = [
  {
    label: 'The only challenge I have is that sometimes I don’t have the bike because at times the owner takes it and on those nights, I am worried in case a mother calls. So I am saving to make sure I buy my own bike and be ready at all times to transport mothers at night.',
    author: "Driver - Winston Bigombe",
  },
  {
    label: 'I am so happy that I have used my bike and life at least to save lives, and I promise to continue with the job... Thanks for the district and Safe Mothers, Safe Babies for recognizing that we also can do some work and training us.',
    author: "Driver - Dominic Katureebe ",
  },
  {
    label: 'Am really happy and excited about the boda-boda who decided to be helping mothers. Having their numbers makes it easy to call whenever you feel any pain',
    author: 'Mother - Diana Nakirye',
  },
  {
    label: 'It was really painful, but I thanked the boda that he understood and accepted to take me because I remember holding him with a lot of pain but he could understand. He drove me with care.',
    author: 'Mother - Kakira Eriyo',
  },
  
];

const styles = theme => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
    margin: "0 auto",
    backgroundColor: 'rgb(244, 245, 249)',
    
  },
  header: {
    height: '250px',
    padding: "10px 30px 5px",
    borderRadius: "5px",
    backgroundColor: 'rgb(244, 245, 249)',
    [theme.breakpoints.down('sm')]: {
        height: 'auto'
    },
  },
  stepper:{
      backgroundColor: 'rgb(244, 245, 249)'
  },
  headerP:{
    fontSize: '1.4rem',
    lineHeight: 1.4,
    display: 'flex',
    margin: 0,
    alignItems: "baseline",
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
  },
  quotes:{
      fontSize: '3.5rem',
      fontFamily: 'cursive',
      fontWeight: "bold",
      color: '#0277bd',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.2rem',
    },
  },
  author:{
      fontStyle: 'italic',
      fontSize: '1.2rem',
      color: "#0277bd"
  }
});

class TextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <p className={classes.headerP}>
            <span className={classes.quotes}>"</span>
            {tutorialSteps[activeStep].label}
          </p>
          <p className={classes.author}>{tutorialSteps[activeStep].author}</p>
        </div>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          className={classes.stepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {/* {theme.direction === 'rtl' ? '<' : '>'} */}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {/* {theme.direction === 'rtl' ? '<' : '>'} */}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
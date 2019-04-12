import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
  headerText: {
    margin: "100px auto 25px",
    fontSize: "2rem"
  },
  buttons: {
    padding: "8px 16px",
    fontSize: '1.1rem',
    margin: '0 10px',
    backgroundColor: '#00897b',
    color: 'white',
    borderRadius: '7px',
    width: '25%',
    '&:hover': {
      backgroundColor: 'green'
   },
   [theme.breakpoints.down('sm')]: {
    width: '80%',
    margin: '10px 0',
  },
},
  btnsBox: {
    display: 'flex',
    width: "95%",
    margin: '0 auto 50px',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
          flexWrap:'wrap'
    },
  }
})
function Contact(props) {
  const {classes} = props
  return (
    <section>
      <h3 className={classes.headerText}>Not convinced? Get in touch!</h3>
      <div>
        <div>
          <p>We're always looking to train new drivers or hear from other mother's experience. Don't hesitate to call or email!
          </p>
          <div className={classes.btnsBox}>
            <a className={classes.buttons}  href="mailto:birthride@gmail.com" target="_top">Send Us a Note</a>
            <a className={classes.buttons} href="tel:#######">Give us a call</a>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  )
}

export default withStyles(styles)(Contact)
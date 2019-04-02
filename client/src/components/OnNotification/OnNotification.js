import React, { Component } from 'react'
import { messaging } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, withStyles, Button } from '@material-ui/core';
import './OnNotification.css';

const styles = theme => ({
  root: {
    width: 'unset',
    padding: '10px',
  },
});

class OnNotification extends Component {
    state = {
        notification: null,
        data: null,
    }

    onRejectHandler = () => {
      // send rejection to backend to update ride object (ride_id will be in 'data')

      this.setState({ notification: null, data: null });
    }
    onAcceptHandler = () => {
      // send acceptance to backend to update ride object (ride_id will be in 'data')

      this.setState({ notification: null, data: null });
    }

  render() {
    if (!this.state.notification) {
        return null;
    }
    const { title, body } = this.state.notification
    return (
      <aside className="notification-container">
        <Paper className={this.props.classes.root}>
          <Typography variant="h5" component="h3">{title}</Typography>
          <Typography component="p">{body}</Typography>
          <Button color="primary" onClick={this.onAcceptHandler}>Accept</Button>
          <Button color="secondary" onClick={this.onRejectHandler}>Reject</Button>
        </Paper>
      </aside>
    )
  }
  componentDidMount() {
      messaging.onMessage(({data, notification}) => {
          this.setState({notification, data});
      })

  }

}

export default withStyles(styles)(OnNotification);
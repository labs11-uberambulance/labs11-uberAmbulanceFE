import React, { Component } from 'react'
import { messaging } from '../../firebase';
import { withRouter } from 'react-router-dom';


class OnNotification extends Component {
    state = {
        notification: null,
        data: null,
    }

    

  render() {
    if (!this.state.notification) {
        return null;
    }
    return (
      <div onClick={() => this.props.history.push(this.state.data.url)}>
        <p>Title: {this.state.notification.title}</p>
        <p>Body: {this.state.notification.body}</p>
      </div>
    )
  }
  componentDidMount() {
      messaging.onMessage(({data, notification}) => {
          this.setState({notification, data});
      })

  }

}

export default withRouter(OnNotification);
import React, { Component } from 'react'
import MomProfileMenu from './MomProfileMenu'
import MotherMap from '../GoogleMaps/MotherMap/MotherMap'
import { Button } from '@material-ui/core';

export default class HomePage extends Component {
  constructor(props){
      super(props);
      this.state={
          rideStart:'',
          rideEnd: ''
      }
  }
  setRideStart = origin =>{
      this.setState({rideStart: origin})
  }
  setRideEnd = dest =>{
      this.setState({rideEnd: dest})
  }

  render() {
    return (
      <div>
        <MomProfileMenu/>
            <p className="welcome">MothersView</p>
        {this.state.rideStart && this.state.rideEnd ?
        <Button onClick>Request Ride</Button> :
        null
        }
        <MotherMap 
        setRideStart={this.setRideStart}
        setRideEnd={this.setRideEnd}
        />
        
      </div>
    )
  }
}


  
import React, { Component } from 'react'
import {connect} from 'react-redux'

import MomProfileMenu from './MomProfileMenu'
import MotherMap from '../GoogleMaps/MotherMap/MotherMap'
import { Button } from '@material-ui/core';
import {getDrivers} from '../../store/actions/rides'


class HomePage extends Component {
  constructor(props){
      super(props);
      this.state={
          rideStart:'',
          rideEnd: ''
      }
  }
  setRideStart = origin =>{
      var test = []
      test.push(Object.values(origin))
      console.log(test)
      this.setState({rideStart: test.join()})
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
        <Button onClick={e=>this.props.getDrivers(this.state.rideStart)}>Request Ride</Button> :
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  getDrivers
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
  
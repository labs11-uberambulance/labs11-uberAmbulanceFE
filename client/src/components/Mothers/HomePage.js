import React, { Component } from 'react'
import {connect} from 'react-redux'

import MomProfileMenu from './MomProfileMenu'
import MotherMap from '../GoogleMaps/MotherMap/MotherMap'
import { Button } from '@material-ui/core';
import {getDrivers} from '../../store/actions/rides'
import axios from '../../axios-instance'


class HomePage extends Component {
  constructor(props){
      super(props);
      this.state={
          rideStart:'',
          rideEnd: '',
          placeInfo: null,
          selectedDriver: '',
          driverName: '',
          completed: false
      }
  }
  submitFinalRideRequest = firebase_id =>{
    const end = this.state.rideEnd;
    const start = this.state.rideStart;
    const hospital = this.state.placeInfo.name;
    const {name,phone} = this.props.user
    const info = {end,start,hospital,name,phone}
    console.log(info)
    axios.post(`/api/rides/request/driver/${firebase_id}`, ({...info}) )
    this.setState({completed: true})
  }


  setRideStart = origin =>{
      var test = []
      test.push(Object.values(origin))
      console.log(test)
      this.setState({rideStart: test.join()})
  }
  setRideEnd = (dest, place) =>{
       var test = []
      test.push(Object.values(dest))
      console.log(test)
      this.setState({rideEnd: test.join(), placeInfo: place})
  }
  selectDriver = (e, id, name) =>{
    this.setState({selectedDriver: id, driverName:name,});
  }

  render() {
    return (
      // {this.state.completed ? <h1>Thanks for choosing BirthRide your driver will be contacting you shortly!</h1>
      // :
      <>
      {this.state.selectedDriver.length>1 ? <button onClick={e=>this.submitFinalRideRequest(this.state.selectedDriver)}>Final Request</button> :null }
      <div>
        <MomProfileMenu/>
            <p className="welcome">MothersView</p>
        {this.state.rideStart && this.state.rideEnd ?
        <Button onClick={e=>this.props.getDrivers(this.state.rideStart)}>Request Ride</Button> :
        null
        }
        {this.props.rides.length>0 ? 
        <>
        <p>Pick A Driver: </p> 
        <p>{this.state.driverName ? `You've selected ${this.state.driverName} as your driver.`: null}</p>
        <div>{this.props.rides.map(ride=><button 
        onClick={(e)=>this.selectDriver(e, ride.driver.firebase_id, ride.driver.name)}
        key={ride.driver.id} >{ride.driver.name}</button>)}</div>
        </>
        :null
        }
        <MotherMap 
        setRideStart={this.setRideStart}
        setRideEnd={this.setRideEnd}
      /> 
      </div> 
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  rides: state.rides.rides,
  user: state.auth.user
})

const mapDispatchToProps = {
  getDrivers
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
  
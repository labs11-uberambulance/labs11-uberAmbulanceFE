import React from "react";
import { connect } from "react-redux";
import axios from '../../axios-instance';
import MotherHomePage from '../../components/Mothers/HomePage'


const start = { lng: 1.0968556, lat: 33.4300912, location: 'Kakoge, Uganda' }
const end = { lng: 0.3287080,lat: 32.557992,name: 'Hospital Name',distance: '10km' }

function MothersView() {
  const requestDriverHandler = () => {
    axios.post('/api/rides/request/driver/VhuBXHKe4cQFvdpwOMpqhGv2EHx1', {start, end}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  return (<>
  <MotherHomePage/>
    <button onClick={requestDriverHandler}>Request Driver</button>
  </>)
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  {}
)(MothersView);

import React from "react";
import { connect } from "react-redux";
import axios from '../../axios-instance';
import MotherHomePage from '../../components/Mothers/HomePage'


const start =`${33.4300912},${1.0968556}`
const end = `${32.557992},${0.3287080}` 
const hospital = 'Hospital Name';
const name = 'Lauren'
const distance = '10';
const phone = '+11111111111'

function MothersView() {
  const requestDriverHandler = () => {
    axios.post('/api/rides/request/driver/VhuBXHKe4cQFvdpwOMpqhGv2EHx1', 
    {
      start, end, 
      name, phone, 
      distance, hospital 
    }).then(res => {
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

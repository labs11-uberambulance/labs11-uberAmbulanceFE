import React from "react";
import { connect } from "react-redux";
import MotherHomePage from '../../components/Mothers/HomePage'



function MothersView() {

  return (<>
  <MotherHomePage/>
  
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

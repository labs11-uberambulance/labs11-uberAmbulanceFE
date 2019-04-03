import React from "react";
import { connect } from "react-redux";
import OriginMap from "../../components/GoogleMaps/OriginMap/OriginMap";
import '../../components/GoogleMaps/OriginMap/OriginMap.css';
import MomProfileMenu from './MomProfileMenu'


function MothersView() {
  return (<>
  <MomProfileMenu/>
  <p className="welcome">MothersView</p>
  
  <OriginMap/>
  </>)
}

const mapStateToProps = state => ({
  user: state.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  {}
)(MothersView);

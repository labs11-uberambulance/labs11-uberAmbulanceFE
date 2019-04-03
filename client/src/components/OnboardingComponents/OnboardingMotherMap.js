import React from "react";
import MotherMap from "../../components/GoogleMaps/MotherMap/MotherMap";

function OnboardSetLocation(props) {
  return (
    <>
      <MotherMap storeRoute={props.storeRoute} />
    </>
  );
}

export default OnboardSetLocation;

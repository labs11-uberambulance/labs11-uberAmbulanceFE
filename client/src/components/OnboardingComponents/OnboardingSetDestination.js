import React from "react";
import DestinationMap from "../../components/GoogleMaps/DestinationMap/DestinationMap";

function OnboardSetLocation(props) {
  return (
    <>
      <DestinationMap storeDest={props.storeDest} />
    </>
  );
}

export default OnboardSetLocation;

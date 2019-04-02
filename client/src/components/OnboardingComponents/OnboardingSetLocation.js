import React from "react";
import OriginMap from "../../components/GoogleMaps/OriginMap/OriginMap";
// import DestinationMap from "../../components/GoogleMaps/DestinationMap/DestinationMap";

function OnboardSetLocation(props) {
  return (
    <>
      <OriginMap storeLatLng={props.storeLatLng} />
    </>
  );
}

export default OnboardSetLocation;

import React from "react";
import OriginMap from "../GoogleMaps/OriginMap/OriginMap";

function DriverUpdateLocation(props) {
  return (
    <>
      <OriginMap
        latInit={props.latInit}
        lngInit={props.lngInit}
        storeLatLng={props.storeLatLng}
      />
    </>
  );
}

export default DriverUpdateLocation;

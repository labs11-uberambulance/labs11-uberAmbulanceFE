import React from "react";
import OriginMapDrivers from "../GoogleMaps/OriginMapDrivers/OriginMap";

function DriverUpdateLocation(props) {
  return (
    <>
      <OriginMapDrivers
        latInit={props.latInit}
        lngInit={props.lngInit}
        storeLatLng={props.storeLatLng}
        mapId={"driver-update-loc"}
      />
    </>
  );
}

export default DriverUpdateLocation;

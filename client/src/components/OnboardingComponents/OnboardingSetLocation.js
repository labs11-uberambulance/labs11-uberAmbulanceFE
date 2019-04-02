import React from "react";
import OriginMap from "../../components/GoogleMaps/OriginMap/OriginMap";
import DestinationMap from "../../components/GoogleMaps/DestinationMap/DestinationMap";

function OnboardSetLocation() {
  console.log("Onboarding Set Location: ");

  return <DestinationMap />;
}

export default OnboardSetLocation;

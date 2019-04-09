import React from "react";
import Drawer from "./Drawer";

export default function DriverProfileMenu(props) {
  return (
    <div>
      <Drawer user={props.user} profileImg={props.profileImg} />
    </div>
  );
}

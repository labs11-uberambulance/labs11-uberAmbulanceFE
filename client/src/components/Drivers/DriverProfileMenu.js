import React from "react";
import Drawer from "./Drawer";

export default function MomProfileMenu(props) {
  return (
    <div>
      <Drawer profileImg={props.profileImg} />
    </div>
  );
}

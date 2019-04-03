import React from 'react'
import PickupMap from '../../GoogleMaps/OriginMap/OriginMap.js'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Pickup(props) {
  return (
    <div>
        <Typography variant="subtitle1">To get started drag and drop the Red location Pin on the map to where you'd like to be picked up. Feel free to use the search bar below to find the city nearest you.</Typography>  
      <PickupMap setOrigin={props.setOrigin}/>
    </div>
  )
}

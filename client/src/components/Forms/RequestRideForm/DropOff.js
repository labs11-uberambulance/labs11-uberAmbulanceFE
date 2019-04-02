import React from 'react'
import DestinationMap from '../../GoogleMaps/DestinationMap/DestinationMap'

export default function DestinationOptions(props) {
 
  return (
    <div>
      <DestinationMap setDestination={props.setDestination}/>
    </div>
  )
}

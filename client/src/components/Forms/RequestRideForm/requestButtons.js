import React from 'react'
import Button from "@material-ui/core/Button";

export default function requestButtons() {
  return (
    <div>
      <Button onClick={e=>console.log('Requested')}>Request A Ride</Button>
      <Button onClick={e=>console.log('Find Nearest Driver')}>Find nearest Driver</Button>
    </div>
  )
}

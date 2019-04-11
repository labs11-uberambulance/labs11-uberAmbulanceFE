import React from 'react'


export default function DriverCard(props) {
    console.log(props)
  return (
    <div className="driver-card"
    >
    <p>{props.ride.driver.name}</p>
    <img src={props.ride.driver.photo_url} alt={`${props.ride.driver.name}'s Profile Picture`}/>
    <p>ETA: {props.ride.duration.text}</p>
    <p>Price: {props.ride.driver.price}</p>
    </div>
  )
}

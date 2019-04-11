import React from 'react'


export default function DriverCard(props) {
    console.log("CARD",props.ride.distance )
  return (
    <div className="driver-card hover-cursor" onClick={()=>props.selectDriver(props.ride.driver.id, props.ride.driver.name, props.ride.distance)}>
      <p onClick={()=>props.selectDriver(props.ride.driver.id, props.ride.driver.name, props.ride.distance)}>{props.ride.driver.name}</p>
      <img onClick={()=>props.selectDriver(props.ride.driver.id, props.ride.driver.name, props.ride.distance)} src={props.ride.driver.photo_url} alt={`${props.ride.driver.name}'s Profile Picture`}/>
      <p onClick={()=>props.selectDriver(props.ride.driver.id, props.ride.driver.name, props.ride.distance)}>ETA: {props.ride.duration.text}</p>
      <p onClick={()=>props.selectDriver(props.ride.driver.id, props.ride.driver.name, props.ride.distance)}>Price: {props.ride.driver.price}</p>
    </div>
  )
}

import React from "react";

export default function DriverCard(props) {
  const proImg={
    background: `url(${props.ride.driver.photo_url
    }) 50% 50% / cover no-repeat`,
    height: '100px',
    width: '80%',
    borderRadius:'15px',
    margin: '0 auto'
  }
  return (
    <div
      className="driver-card hover-cursor hvr-float-shadow "
      onClick={() =>
        props.selectDriver(
          props.ride.driver.firebase_id,
          props.ride.driver.name,
          props.ride.distance
        )
      }
    >
      <p
        onClick={() =>
          props.selectDriver(
            props.ride.driver.firebase_id,
            props.ride.driver.name,
            props.ride.distance
          )
        }
      >
        {props.ride.driver.name}
      </p>
      <div
        onClick={() =>
          props.selectDriver(
            props.ride.driver.firebase_id,
            props.ride.driver.name,
            props.ride.distance
          )
        }
        style={proImg}
        alt={`${props.ride.driver.name}'s Profile Pic`}
      />
      <p
        onClick={() =>
          props.selectDriver(
            props.ride.driver.firebase_id,
            props.ride.driver.name,
            props.ride.distance
          )
        }
      >
        ETA: {props.ride.duration.text}
      </p>
      <p
        onClick={() =>
          props.selectDriver(
            props.ride.driver.firebase_id,
            props.ride.driver.name,
            props.ride.distance
          )
        }
      >
        Price: {props.ride.driver.price}
      </p>
    </div>
  );
}

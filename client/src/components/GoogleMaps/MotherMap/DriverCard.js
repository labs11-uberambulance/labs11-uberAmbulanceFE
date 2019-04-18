import React from "react";

export default function DriverCard(props) {
  const proImg={
    background: `url(${props.ride.driver.photo_url
    }) 50% 50% / cover no-repeat`,
    height: '150px',
    width: '90%',
    borderRadius:'15px',
    margin: '10px auto 0'
  }
  return (
    <div
      className="driver-card hvr-float-shadow"
    >
      <div
        style={proImg}
        alt={`${props.ride.driver.name}'s Profile Pic`}
      />
  <div className="driver-info" >
      <p
        style={{margin: '5px 0'}}
      >
       <b style={{marginRight: '10px', fontSize: '1.2rem', letterSpacing:'.5px'}}>Driver:</b>{props.ride.driver.name}
      </p>
      <p
        style={{margin: '5px 0'}}
      >
       <b style={{marginRight: '10px', fontSize: '1.2rem', letterSpacing:'.5px'}}> ETA: </b> {props.ride.duration.text}
      </p>
      <p
        style={{margin: '5px 0'}}
      >
       <b style={{marginRight: '10px', fontSize: '1.2rem', letterSpacing:'.5px'}}>  Price:</b>  {props.ride.driver.price}
      </p>
  </div>
  <button
  onClick={() =>
    props.selectDriver(
      props.ride.driver.firebase_id,
      props.ride.driver.name,
      props.ride.distance
    )
  }
  >
    Request Driver
  </button>
</div>
  );
}

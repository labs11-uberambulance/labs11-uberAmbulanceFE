import React from 'react'
import GooglePlacesItem from './GooglePlacesItem/GooglePlacesItem';
import { List } from '@material-ui/core';
import './GooglePlacesList.css'



function googlePlacesList(props) {
    console.log(props)
return ( 
    <List
        style={{height: "100%", overflowY: "scroll",}}
        className="google-search-list"
    >
        {props.places.map(place => <GooglePlacesItem handleClose={props.handleClose} rideStart={props.rideStart} getDrivers={props.getDrivers}key={place.id} place={place} clicked={props.setDestination} />)}
    </List>
  )
}

export default googlePlacesList
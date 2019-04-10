import React from 'react'
import GooglePlacesItem from './GooglePlacesItem/GooglePlacesItem';
import { List } from '@material-ui/core';
import './GooglePlacesList.css'

const googlePlacesList = ({places, ...props}) => (
    <List
        style={{height: "100%", overflowY: "scroll",}}
        className="google-search-list"
    >
        {places.map(place => <GooglePlacesItem key={place.id} place={place} clicked={props.setDestination} />)}
    </List>
)

export default googlePlacesList

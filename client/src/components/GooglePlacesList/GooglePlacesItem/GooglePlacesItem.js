import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Button } from '@material-ui/core';


const googlePlacesItem = ({ place, clicked }) => (
    <ListItem
        alignItems="flex-start"
    >
        <ListItemAvatar>
            <Avatar style={{height: "40px", width: "40px"}} alt={place.types[0]} src={place.icon} imgProps={{style:{height: "35px", width: "35px", marginBottom: "5px"}}}></Avatar>
        </ListItemAvatar>
        <ListItemText
            onClick={() => {console.log('Should handle backend request')}}
            primary={place.name}
            primaryTypographyProps={{color: "primary", variant: 'subheading'}}
            secondary={
                <>
                    <Typography component="span" color="textPrimary">
                        {place.formatted_address ? place.formatted_address : ''} {place.opening_hours && place.opening_hours.open_now && "(Currently Open)"}
                    </Typography>
                    {place.rating && `- rating: ${place.rating}`}
                </>
            }
            secondaryTypographyProps={{variant:"caption"}}
        />
        <Button onClick={() => clicked(place)} >Select As Destination</Button>
    </ListItem>
  )

export default googlePlacesItem;
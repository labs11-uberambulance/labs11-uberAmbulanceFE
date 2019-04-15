import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button
} from "@material-ui/core";

function googlePlacesItem(props) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            style={{ height: "40px", width: "40px" }}
            alt={props.place.types[0]}
            src={props.place.icon}
            imgProps={{
              style: { height: "35px", width: "35px", marginBottom: "5px" }
            }}
          />
        </ListItemAvatar>
        <ListItemText
          onClick={() => {
            console.log("Should handle backend request");
          }}
          primary={props.place.name}
          primaryTypographyProps={{ color: "primary", variant: "subtitle1" }}
          secondary={
            <>
              <Typography component="span" color="textPrimary">
                {props.place.formatted_address
                  ? props.place.formatted_address
                  : ""}{" "}
                {props.place.opening_hours &&
                  props.place.opening_hours.open_now &&
                  "(Currently Open)"}
              </Typography>
              {props.place.rating && `- rating: ${props.place.rating}`}
            </>
          }
          secondaryTypographyProps={{ variant: "caption" }}
        />
        <Button
          onClick={() => {
            props.clicked(props.place);
            props.getDrivers(props.rideStart);
            props.handleClose();
          }}
        >
          Select As Destination
        </Button>
      </ListItem>
    </>
  );
}

export default googlePlacesItem;

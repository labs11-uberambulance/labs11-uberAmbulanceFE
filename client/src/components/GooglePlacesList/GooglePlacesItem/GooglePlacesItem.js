import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button
} from "@material-ui/core";
import './GooglePlacesItem.css';

function googlePlacesItem(props) {
  const address = !!props.place.formatted_address ? props.place.formatted_address : "";
  const trimmedAddress = address.split(',')
  const formAddress = `${trimmedAddress[trimmedAddress.length - 2]}, ${trimmedAddress[trimmedAddress.length - 1]}`
  return (
    <>
      <ListItem alignItems="flex-start" style={{width: "100%"}}>
        <ListItemAvatar>
          <Avatar
            style={{ height: "30px", width: "30px" }}
            alt={props.place.types[0]}
            src={props.place.icon}
            imgProps={{
              style: { height: "25px", width: "25px", marginBottom: "5px" }
            }}
          />
        </ListItemAvatar>
        <div className="place-container">
          <ListItemText
            primary={`${props.place.name}`}
            primaryTypographyProps={{ color: "primary", variant: "subtitle1" }}
            secondary={
                <Typography component="span" color="textPrimary">
                  {formAddress}{" "}
                  {props.place.opening_hours &&
                    props.place.opening_hours.open_now &&
                    "(Currently Open)"}
                </Typography>
            }
            secondaryTypographyProps={{ variant: "caption" }}
          />
          <Button
            onClick={() => {
              props.clicked(props.place);
              props.getDrivers(props.rideStart);
              props.handleClose();
            }}
            type="button"
            className="select-place--button"
          >
            Select As Destination
          </Button>
        </div>
      </ListItem>
    </>
  );
}

export default googlePlacesItem;

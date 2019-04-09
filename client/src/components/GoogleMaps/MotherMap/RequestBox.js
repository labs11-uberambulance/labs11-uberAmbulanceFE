import React from 'react'
import {TextField, Button, withStyles } from "@material-ui/core";
const styles = ({ palette }) => ({
  root: {
    zIndex: "40",
    color: palette.secondary.contrastText,
    backgroundColor: palette.secondary.dark
  }
});
function RequestBox(props){
  console.log(props)
  return (
    <div className="reqBox">
      <h1>This is a test</h1>
      <div className="google-search-container">
            <TextField
              label="Search for your location"
              {...props.commonTextProps}
              onKeyPress={props.searchForLocationHandler}
              // need to always have this rendered so when google tries to connect to it we dont get an error
              // since React hasn't placed it on the DOM.
              style={props.locked ? { display: "none" } : {}}
            />
            <TextField
              id="google-search"
              label="Search for your destination"
              {...props.commonTextProps}
              style={!props.locked ? { opacity: 0, width: 0 } : {}}
            />
          </div>
          <Button
              onClick={props.toggleMarkLockHandler}
              className={props.classes.root}
              color="secondary"
            >
              {props.locked && "Un"}Lock Marker
          </Button>
    </div>
  )
}

export default withStyles(styles)(RequestBox);
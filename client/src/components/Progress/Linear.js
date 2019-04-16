import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  linearColorPrimary: {
    backgroundColor: "#1279ba"
  },
  linearBarColorPrimary: {
    backgroundColor: "#91dfd3"
  }
});

function CustomizedProgress(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <LinearProgress
        classes={{
          colorPrimary: classes.linearColorPrimary,
          barColorPrimary: classes.linearBarColorPrimary
        }}
      />
    </Paper>
  );
}

CustomizedProgress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedProgress);

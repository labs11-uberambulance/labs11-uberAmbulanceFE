import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MomIcon from "./icons/icons8-pregnant-filled-50.png";
import DriverIcon from "./icons/icons8-ambulance-50.png";
import { NavLink, withRouter } from 'react-router-dom';

const styles = ({ palette }) => ({
  card: {
    minWidth: 275,
    width: "15%",
    margin: "10px",
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    width: "80%",
    margin: "0 auto",
    background: palette.secondary.dark,
    color: palette.primary.contrastText,
    "&:hover": {
      backgroundColor: "green"
    }
  }
});

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.mother ? "Mother" : "Driver"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <img alt="mother/driver" src={props.mother ? MomIcon : DriverIcon} />
        </Typography>
        <Typography component="p">
          {props.mother
            ? "Register today to make sure you're prepared come delivery day!"
            : "Tired of missing out on rides? Never miss out again with Birthride"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button} size="large">
         <NavLink to="/register"> Register Now</NavLink>
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SimpleCard));

import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DriverProfileMenu from "./DriverProfileMenu";
import DriverEditProfileModal from "./DriverEditProfileModal";
import DriverEditPricePopover from "./DriverEditPricePopover";

const styles = {
  card: {
    minWidth: 275
  },
  button: {
    width: "100%"
  }
};

class DriverHUD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStatusClick = () => {
    this.props.usrUpdate(this.props.user, {
      driver: { active: !this.props.user.driverData.active }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActions>
          <Button
            className={classes.button}
            color={this.props.user.driverData.active ? "secondary" : "primary"}
            variant="contained"
            onClick={this.handleStatusClick}
          >
            {this.props.user.driverData.active ? "Set Inactive" : "Set Active"}
          </Button>
        </CardActions>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <DriverProfileMenu
                user={this.props.user}
                profileImg={this.props.user.driverData.photo_url}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom>
                Welcome, {this.props.user.name}
              </Typography>
              <Card>
                <List>
                  {/* <ListItem button> */}
                  <DriverEditPricePopover />
                  {/* <ListItemIcon>
                      <span style={{ color: "green" }}>
                        USh{this.props.user.driverData.price}
                      </span>
                    </ListItemIcon>
                    <ListItemText>
                      Your current maximum ride charge
                    </ListItemText> */}
                  {/* </ListItem> */}
                  <ListItem button>
                    <ListItemIcon>
                      <span style={{ color: "green" }}>
                        {this.props.user.phone}
                      </span>
                    </ListItemIcon>
                    <ListItemText>
                      Phone number Mothers can contact you on
                    </ListItemText>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <DriverEditProfileModal
            className={classes.button}
            user={this.props.user}
          />
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(DriverHUD);

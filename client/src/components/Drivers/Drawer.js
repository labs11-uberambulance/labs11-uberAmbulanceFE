import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import DriverEditProfileModal from "./DriverEditProfileModal";
import DriverRideHistoryModal from "./DriverRideHistoryModal";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Card style={{ width: "140px", borderRadius: "100px" }}>
            <CardActionArea onClick={this.toggleDrawer("left", true)}>
              <CardMedia
                component="img"
                alt="DriverImg"
                height="140"
                width="140"
                image={this.props.profileImg}
                title="Driver"
              />
            </CardActionArea>
          </Card>
          <DriverEditProfileModal user={this.props.user} />
          <DriverRideHistoryModal user={this.props.user} />
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              this.props.history.push("/logout");
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <Card style={{ width: "140px", borderRadius: "100px" }}>
          <CardActionArea onClick={this.toggleDrawer("left", true)}>
            <CardMedia
              component="img"
              alt="DriverImg"
              height="140"
              width="140"
              image={this.props.profileImg}
              title="Driver"
            />
          </CardActionArea>
        </Card>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          />
          {sideList}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default withRouter(withStyles(styles)(TemporaryDrawer));

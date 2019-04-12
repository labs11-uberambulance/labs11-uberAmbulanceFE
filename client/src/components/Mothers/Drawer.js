import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux'
import MotherModal from './MotherModal'



const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  proBtn:{
    zIndex: "100",
    position: "absolute",
    top: "0",
    left: "0",
    border: "1px solid blue",
    background: "blue",
    color: "white",
  }
};

class TemporaryDrawer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  }
  

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {[`Welcome ${this.props.user.name}`,'Profile', 'Request Ride'].map((text, index) => (
            <ListItem onClick={e=>console.log(e.target)} button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text, index) => (
            <ListItem onClick={() => {this.props.history.push('/logout')}}button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <div>
        <Button className={classes.proBtn}onClick={this.toggleDrawer('left', true)}>Profile</Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
          <MotherModal user={this.props.user}/>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(TemporaryDrawer)));
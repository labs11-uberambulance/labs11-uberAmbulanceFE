import React from 'react';
import {connect} from 'react-redux'
import {initUsrUpdate} from '../../store/actions/auth'

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from "@material-ui/core/TextField";

class ResponsiveDialog extends React.Component {
  constructor(props){
    super(props);
    this.nameInp = React.createRef();
    this.phoneInp = React.createRef();
    this.emailInp = React.createRef();
    this.dueDateInp = React.createRef();

    this.state = {
      editing: false,
      userData: {
        name: this.props.user.name,
        phone: this.props.user.phone,
        email: this.props.user.email,
      },
      momData:{
        due_date: this.props.user.motherData.due_date,
      }
    };
  }
  updateForm = e =>{
    this.setState({
      userData:{
        ...this.state.userData,
        [e.target.name]: e.target.value
      }
    }) 
  }
  updateFormMom = e =>{
    this.setState({
      momData:{
        ...this.state.momData,
        [e.target.name]: e.target.value
      }
    }) 
  }
  startEditing=() =>{
    this.setState({editing:true})
  }
  stopEditing=() =>{
    this.setState({editing:false})
  }
  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false, editing: false });
  // };
  handleSubmit = () =>{
    const data = {
      user:{
        ...this.state.userData
      },
      mother: {
        ...this.state.momData
      }
    }

    this.props.initUsrUpdate(this.props.user, data)

  }
  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    console.log(this.props)
    return (
  
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.props.handleClickOpen}>
         View Your Profile
        </Button> */}
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{`${this.props.user.name}'s Profile`}</DialogTitle>
          <DialogContent>
          {this.state.editing? 
          <>
          <TextField
          autoFocus
          margin="dense"
          name="name"
          label="name"
          value = {this.state.userData.name}
          type="text"
          fullWidth
          onChange = {e=>this.updateForm(e)}
          
        />
        <TextField
          autoFocus
          margin="dense"
          name="phone"
          inputRef={this.phoneInp}
          label="Phone Number"
          value = {this.state.userData.phone}
          type="phone"
          fullWidth
          onChange = {e=>this.updateForm(e)}
        />
          <TextField
          autoFocus
          margin="dense"
          name="email"
          inputRef={this.emailInp}
          label="Email Address"
          value = {this.state.userData.email}
          type="email"
          fullWidth
          onChange = {e=>this.updateForm(e)}
        />
          
          <TextField
          autoFocus
          margin="dense"
          name="due_date"
          label="Due Date"
          inputRef={this.dueDateInp}
          value = {this.state.momData.due_date}
          type="date"
          fullWidth
          onChange = {e=>this.updateFormMom(e)}
        />
        </>
       :
       <>
            <DialogContentText>
              Name: {this.props.user.name}
            </DialogContentText>
            <DialogContentText>
              Phone: {this.props.user.phone}
            </DialogContentText>
            <DialogContentText>
              Email: {this.props.user.email}
            </DialogContentText>
            <DialogContentText>
              Due Date: {this.props.user.motherData.due_date}
            </DialogContentText>
        </>
          }
             
          </DialogContent>
          <DialogActions>
            {this.state.editing?
            <Button onClick={e=>this.handleSubmit(e)} color="primary">
            Save 
          </Button>
            :<Button onClick={e=>this.startEditing(e)} color="primary">
              Edit 
            </Button>
            }
            <Button onClick={this.props.handleClose} color="primary" autoFocus>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  initUsrUpdate
}


export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(ResponsiveDialog));
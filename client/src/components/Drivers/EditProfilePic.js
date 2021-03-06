import React from "react";
import { connect } from "react-redux";
import firebase from "../../firebase";
import { initUsrUpdate } from "../../store/actions/auth";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);
    this.photoInp = React.createRef();
    this.state = {
      file: null
    };
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.file);
  };

  fileUploadHandler = e => {
    e.persist();
    this.setState(prevState => {
      if (prevState.file && e.target.files.length === 0) return;
      return { file: e.target.files[0] };
    });
  };

  render() {
    const { onClose, currImg, ...other } = this.props;

    return (
      <Dialog
        {...other}
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        style={{ padding: "20px" }}
      >
        <DialogTitle id="simple-dialog-title">Select a new image.</DialogTitle>
        <div>
          {this.state.file ? (
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="center"
            >
              <div
                style={{
                  background: `url(${URL.createObjectURL(
                    this.state.file
                  )}) 50% 50% / cover no-repeat`,
                  height: "140px",
                  width: "140px",
                  borderRadius: "40px"
                }}
              />
              {`${this.state.file.name.slice(0, 10)}...`}
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <div
                style={{
                  background: `url(${
                    this.props.currImg
                  }) 50% 50% / cover no-repeat`,
                  backgroundSize: "cover",
                  height: "140px",
                  width: "140px",
                  borderRadius: "40px"
                }}
              />
            </Grid>
          )}
          <Button
            type="button"
            color="primary"
            onClick={() => this.photoInp.current.click()}
            fullWidth
          >
            Select Profile Image
          </Button>
          {this.state.file && (
            <>
              <Button
                type="button"
                color="secondary"
                onClick={this.handleSubmit}
                fullWidth
              >
                Save
              </Button>
              <Button
                type="button"
                color="secondary"
                onClick={this.handleClose}
                fullWidth
              >
                Cancel
              </Button>
            </>
          )}
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            ref={this.photoInp}
            onChange={this.fileUploadHandler}
          />
        </div>
      </Dialog>
    );
  }
}

class EditProfileImg extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async image => {
    const storageRef = firebase
      .storage()
      .ref(
        `profile_images/${this.props.user.firebase_id}@${new Date().toISOString()}`
      );
    const uploadTask = storageRef.put(image, { contentType: image.type });
    return uploadTask.then(() => {
      return uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        const data = {
          driver: {
            photo_url: downloadURL
          }
        };
        this.props.initUsrUpdate(this.props.user, data);
        this.handleClose();
      });
    });
  };

  render() {
    return (
      <>
        <ButtonBase
          style={this.props.btnStyle}
          focusRipple
          onClick={this.handleClickOpen}
        >
          {this.props.display}
        </ButtonBase>
        <SimpleDialog
          open={this.state.open}
          onClose={this.handleClose}
          currImg={this.props.user.driverData.photo_url}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  initUsrUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileImg);

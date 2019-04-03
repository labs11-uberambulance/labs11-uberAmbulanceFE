import React, { Component } from 'react'
import { initGoogleScript, destroyGoogleScript, searchGoogle, fetchMarkerPosition } from './GoogleAPI';
import './OriginMap.css';
import { TextField, Button } from '@material-ui/core';

class OriginMap extends Component {
    constructor(props) {
        super(props)
        this.userInp = React.createRef();
        this.state = {
            origin: null
        }
    }
    searchForLocationHandler = (e) => {
        if (e.key === 'Enter') {
            searchGoogle(this.userInp.current.value)
        }
    }
    originDeterminedHandler = () => {
        const originLngLat = fetchMarkerPosition();
        this.setState({origin: originLngLat});
    }
    
  render() {
    return (
    <>
      <div className="map-container">
          <div id="map" ></div>
          <div className="search-bar">
          <p>Search Start Locations</p>
            <TextField
                inputRef={this.userInp}
                onKeyPress={this.searchForLocationHandler}
                style={{margin: 1 + 'em'}}
            />
          </div>
            <div className="map-buttons">
            <Button onClick={this.originDeterminedHandler} >Set Location</Button>
            <h2>{this.state.origin ? `You're pickup location is ${this.state.origin}`: null}</h2>
            {/* <Button onClick={e=>this.props.setOrigin(this.state.origin)}> Confirm Pickup Location </Button> */}
            </div>
        </div>

    </>
    )
  }
  componentDidMount() {
      initGoogleScript()
  }
  componentWillUnmount() {
      destroyGoogleScript()
  }
}


export default OriginMap;
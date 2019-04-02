import React, { Component } from 'react'
import { initGoogleScript, destroyGoogleScript, searchGoogle, fetchMarkerPosition } from './GoogleAPI';
import './OriginMap.css';
import { TextField, Button } from '@material-ui/core';

class OriginMap extends Component {
    constructor(props) {
        super(props)
        this.userInp = React.createRef();
    }
    searchForLocationHandler = (e) => {
        if (e.key === 'Enter') {
            searchGoogle(this.userInp.current.value)
        }
    }
    originDeterminedHandler = () => {
        const originLngLat = fetchMarkerPosition();
        console.log(originLngLat);
    }

  render() {
    return (
      <div>
          <div>
            <TextField
                inputRef={this.userInp}
                onKeyPress={this.searchForLocationHandler}
                style={{margin: 1 + 'em'}}
            />
            <div id="map"></div>
          </div>
          <Button onClick={this.originDeterminedHandler} >Set Location</Button>
      </div>
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
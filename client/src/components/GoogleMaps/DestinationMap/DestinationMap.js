import React, { Component } from 'react'
import { initGoogleScript, destroyGoogleScript } from './GoogleAPI';
import { TextField, Button } from '@material-ui/core';

import './DestinationMap.css';

class DestinationMap extends Component {
    state = {
        places: null,
        search: '',
        markersSelected: []
    }

  render() {
      let { places, markersSelected } = {...this.state};
      if (markersSelected.length > 0) {
          places = places.filter(place => markersSelected.includes(place.name))
      }
    return (
      <div style={{display: 'flex'}}>
        <div>
            <div className="google-search-container">
                <TextField
                    id="google-search"
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    fullWidth
                />
                { places < this.state.palces && <Button type="button" onClick={() => this.setState({ markersSelected: [] })}>Show All</Button> }
            </div>
            <div id="map"></div>
        </div>
        {/* uncomment if we want to display a list of places next to map */}
        {/* { places && <GooglePlacesList places={Array.isArray(places) ? places: [places]} /> } */}
      </div>
    )
  }
    //   call backs for getting places and markers clicked
    passPlacesToComponent = (places) => {
        this.setState({ places, markersSelected: [] })
    }
    markerSelectedHandler = (name) => {
        this.setState(({ markersSelected }) => {
            const markers = [...markersSelected];
            markers.push(name);
            return { markersSelected: markers }
        })
    }
    componentDidMount() {
        initGoogleScript({
            placesCB: this.passPlacesToComponent, 
            markerCB: this.markerSelectedHandler
        })
    }
    componentWillUnmount() {
        destroyGoogleScript()
    }
}


export default DestinationMap;
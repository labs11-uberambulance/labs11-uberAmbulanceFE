import React, { Component } from 'react'
import { TextField, Button, withStyles } from '@material-ui/core';
import GooglePlacesList from '../../GooglePlacesList/GooglePlacesList';
import { initGoogleScript, searchGoogle, lockMarker, unlockMarker, calcAndDisplayRoute, destroyGoogleScript } from './GoogleAPI';
import './MotherMap.css';


const styles = ({ palette }) => ({
    root: {
        position: 'absolute',
        zIndex: '40',
        top: '10px',
        left: '5px',
        color: palette.secondary.contrastText,
        backgroundColor: palette.secondary.dark,
    }
})
class MotherMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            places: null,
            search: '',
            markersSelected: [],
            locked: false,
            startCoords: null,
        }
    }
    
    toggleMarkLockHandler = () => {
        this.setState(({ locked }) => {
            if (locked) {
                unlockMarker()
                return { search: '', places: null, markersSelected: [], locked: false }
            } else {
                const position = lockMarker()
                this.props.setRideStart(position)
                return { search: '', locked: true, startCoords: position }
            }
        })
    }

    searchForLocationHandler = (e) => {
        if (e.key === 'Enter') {
            searchGoogle(this.state.search)
        }
    }
    mapOutRoute = (place) => {
        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        this.props.setRideEnd(location)
        calcAndDisplayRoute(this.state.startCoords, location); 
    }

  render() {
    let { places, markersSelected } = {...this.state};
    if (markersSelected.length > 0) {
        places = places.filter(place => markersSelected.includes(place.name))
    }
    const commonTextProps = {value: this.state.value, onChange: (e) => this.setState({search: e.target.value}), fullWidth: true}
    return (
        <>
        <div style={{margin: "0 auto", width: '550px'}}>
            <p>{this.state.locked ? 'Search for your destination' : 'Search for your location'}</p>
            <div className="google-search-container">
                <TextField 
                    label="Search for your location" 
                    {...commonTextProps} 
                    onKeyPress={this.searchForLocationHandler} 
                    // need to always have this rendered so when google tries to connect to it we dont get an error
                    // since React hasn't placed it on the DOM.
                    style={this.state.locked ? {display: 'none'}: {}}
                />
                <TextField 
                    id="google-search" 
                    label="Search for your destination" 
                    {...commonTextProps} 
                    style={!this.state.locked ? {opacity: 0, width: 0}: {}}
                />  
            </div>
            <div className="google-maps-container">
                <div id="map"></div>
                <Button 
                    onClick={this.toggleMarkLockHandler}
                    className={ this.props.classes.root }
                    color='secondary'
                >{this.state.locked && 'Un'}Lock Marker</Button>
            </div>
        </div>
        { places && <GooglePlacesList
            places={Array.isArray(places) ? places: [places]} 
            setDestination={this.mapOutRoute}
        /> }
        </>
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
        initGoogleScript(this.passPlacesToComponent, this.markerSelectedHandler, 0.918607, 33.409670999999996)
        setTimeout(()=>{
            calcAndDisplayRoute({lat: 0.918607, lng: 33.409670999999996}, {lat: 0.988607, lng: 33.509670999999996})
        }, 1000)
    }
    componentWillUnmount() {
        destroyGoogleScript()
    }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}


export default withStyles()(MotherMap);
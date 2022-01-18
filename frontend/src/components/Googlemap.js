import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Googlemap extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      mapCenter:{
          lat : 19.01803,
          lng: 72.828343
      }
    };
   
    // onMarkerClick = (props, marker, e) =>
    //   this.setState({
    //     selectedPlace: props,
    //     activeMarker: marker,
    //     showingInfoWindow: true
    //   });
   
    // onMapClicked = (props) => {
    //   if (this.state.showingInfoWindow) {
    //     this.setState({
    //       showingInfoWindow: false,
    //       activeMarker: null
    //     })
    //   }
    // };
   
    render() {
      return (
        <Map 
        google={this.props.google}
        initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
        }}
        center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
        }}
        >
          <Marker
          position ={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          />
        </Map>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ("AIzaSyDuHhuNu5lOKYW7g37eaNK-cEQrUMa7fHs")
  })(Googlemap)


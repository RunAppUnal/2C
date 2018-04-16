/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Grid, Card } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import MapStyles from './mapStyles';


function geocode(latlng, type) {
  let geocoder = new google.maps.Geocoder();

  var result = geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]){
        let address = results[1].formatted_address.replace(', Bogotá','').replace(', Bogota','').replace(', Colombia','');
        console.log(address);
        localStorage.setItem(type, address);
      }
      else {
        localStorage.setItem(type, 0);
        console.log('No results found');
      }
    } else {
      localStorage.setItem(type, 0);
      console.log('Geocoder failed due to: ' + status);
    }
  });
}


class Map extends Component {
  componentDidMount() {
    const from = this.props.from;
    const to = this.props.to;
    const waypoints = this.props.waypoints;

    this.renderMap(from, to);
    this.setMarkers(from, to);
    this.setWaypoints(from, to, waypoints, this.map);
  }

  renderMap(from, to) {
    this.map = new google.maps.Map(this.refs.map, {
      center: from,
      styles: MapStyles,
      zoom: 15
    });
  }

  setMarkers(from, to){
    this.markers = [
      this.newMarker(from).setIcon("/images/map-icons/green.png"),
      this.newMarker(to)
    ]
  }

  newMarker(pos){
    let marker = new google.maps.Marker({
      map: this.map,
      position: pos
    });
    return marker;
  }

  setWaypoints(from, to, waypoints, map) {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({ suppressMarkers: true });

    directionsService.route({
      origin: from,
      destination: to,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  geocode(inputText, map, marker) {
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address': inputText,
      componentRestrictions: {country: 'CO'}
    }, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  goToPos(e) {
    e.preventDefault();
    this.geocode(this.inputFrom.value, this.map, this.markers[0]);
    this.geocode(this.inputTo.value, this.map, this.markers[1]);
  }

  render() {
    return <div id="map" ref="map"></div>
  }
}


Map.propTypes = {
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  waypoints: PropTypes.array.isRequired
}

export {Map, geocode}

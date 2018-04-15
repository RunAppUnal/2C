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
        localStorage.setItem(type, address);
        console.log(address);
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

    console.log(from);
    this.renderMap(from.pos, to.pos);
    this.setMarkers(from, to);
  }

  renderMap(fromPos, toPos) {
    this.map = new google.maps.Map(this.refs.map, {
      center: fromPos,
      styles: MapStyles,
      zoom: 15
    });
  }

  setMarkers(from, to){
    this.markers = [
      this.newMarker(from.pos, from.input),
      this.newMarker(to.pos, to.input)
    ]
  }

  newMarker(pos, input){
    let marker = new google.maps.Marker({
      map: this.map,
      position: pos,
      draggable: true
    });
    if (input.id == "origin") marker.setIcon("/images/map-icons/green.png");
    marker.addListener('dragend', function() {
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({'location': marker.position}, function(results, status) {
        if (status === 'OK') {
          if (results[1])
            input.value = results[1].formatted_address;
          else
            input.value = "Dirección no encontrada";
        } else {
          input.value = "No es posible buscar la dirección";
          console.log('Geocoder failed due to: ' + status);
        }
      });
    });
    return marker;
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
    return(
      // <div className="create map">
      //   <Form className="map form" onSubmit={this.goToPos.bind(this)}>
      //     <Form.Field>
      //       <label><i className="green point icon"></i> Origen:</label>
      //       <input id="origin" ref={node => {this.inputFrom = node;}} />
      //     </Form.Field>
      //     <Form.Field>
      //       <label><i className="red point icon"></i> Destino:</label>
      //       <input id="destination" ref={node => {this.inputTo = node;}} />
      //     </Form.Field><br/>
      //
      //     <center>
      //       <Form.Field width="5">
      //         <label>Hora de Salida:</label>
      //         <input type="time" ref={node => {this.inputTime = node;}} />
      //       </Form.Field>
      //       <Button color="teal" fluid={true} floated="right" type="submit">Crear</Button>
      //     </center>
      //   </Form>
        <div id="map" ref="map"></div>
      // </div>
    )
  }
}


Map.propTypes = {
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired
}

export {Map, geocode}

/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types';


export default class Map extends Component {
  componentDidMount() {
    const {lat, lng} = this.props.initialPosition;

    this.map = new google.maps.Map(this.refs.map, {
      center: { lat, lng },
      zoom: 12
    });

    this.fromMarker = new google.maps.Marker({
      map: this.map,
      position: { lat, lng },
    });

    this.toMarker = new google.maps.Marker({
      map: this.map,
      position: { lat, lng },
    });
  }

  geocode(inputText, map, marker) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': inputText}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  goToPos(e) {
    e.preventDefault();
    this.geocode(this.inputFrom.value, this.map, this.fromMarker);
    this.geocode(this.inputTo.value, this.map, this.toMarker);
  }

  render() {
    return(
      <div>
        <Form onSubmit={this.goToPos.bind(this)}>
          <Form.Field>
            <label>Origen:</label>
            <input ref={node => {this.inputFrom = node;}} />
          </Form.Field>
          <Form.Field>
            <label>Destino:</label>
            <input ref={node => {this.inputTo = node;}} />
          </Form.Field>

          <Button type="submit">Posicionar</Button>
        </Form><br/>

        <div ref="map" style={{width:500, height:500, border:'1px solid black'}}></div>
      </div>
    )
  }
}


Map.propTypes = {
  initialPosition: PropTypes.object.isRequired
}

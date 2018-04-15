/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import MapStyles from './mapStyles';
import Map from './Map';
import '../css/bikeRoutes.css';

import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

var currUserId = localStorage.getItem('currUserId');


const CREATE_BIKE_ROUTE = gql`
  mutation createBikeRoute($bikeRoute: BikeRouteInput!) {
    createBikeRoute(bikeRoute: $bikeRoute){
      id
    }
  }
`;

class CreateBikeRoute extends Component {
  componentDidMount() {
    this.from = {
      pos: {lat: 4.6381938, lng: -74.0862351},
      input: this.inputFrom
    };
    this.to = {
      pos: {lat: 4.6381938, lng: -74.0862351},
      input: this.inputTo
    };

    this.renderMap(this.from.pos, this.to.pos);
    this.setMarkers(this.from, this.to);
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
    return (
      <div className="create map">
        <Form className="map form" loading={this.props.loading} onSubmit={e => {
          e.preventDefault();
          let originLat = this.markers[0].position.lat();
          let originLng = this.markers[0].position.lng();
          let destinationLat = this.markers[1].position.lat();
          let destinationLng = this.markers[1].position.lng();
          this.props.createBikeRoute({ variables: {
            bikeRoute: {
              user_id: currUserId,
              origin: [originLng, originLat],
              destination: [destinationLng, destinationLat],
              time: new Date(this.inputTime)
            }
          } });
        }}>
          <Form.Field>
            <label><i className="green point icon"></i> Origen:</label>
            <input id="origin" ref={node => {this.inputFrom = node;}} onBlur={this.goToPos.bind(this)} />
          </Form.Field>
          <Form.Field>
            <label><i className="red point icon"></i> Destino:</label>
            <input id="destination" ref={node => {this.inputTo = node;}} onBlur={this.goToPos.bind(this)} />
          </Form.Field><br/>
          <Form.Field width="5">
            <label>Hora de Salida:</label>
            <input type="time" ref={node => {this.inputTime = node;}} />
          </Form.Field>
          <Button color="teal" fluid={true} floated="right" type="submit">Crear</Button>
          {this.props.error && <p>Hubo un error! Intenta de nuevo</p>}
        </Form>

        <div id="map" ref="map"></div>

      </div>
    );
  }
};


class AddBikeRoute extends Component {
  render() {
    return(
      <div>
        <br/><br/>
        <h2 className="section-heading"><i className="plus icon"></i> Nueva Ruta en Bici</h2>
        <h3 className="section-subheading">Crea tu propia ruta para encontrar otras similares</h3>


        <Mutation mutation={CREATE_BIKE_ROUTE}>
         {(createBikeRoute, { loading, error, called }) => (
           <CreateBikeRoute createBikeRoute={createBikeRoute} loading={loading} error={error} called={called} />
         )}
        </Mutation>
      </div>
    )
  }
}


export default AddBikeRoute;

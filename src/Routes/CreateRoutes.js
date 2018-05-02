/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import MapStyles from '../BikeRoutes/mapStyles';
import { MyVehicles } from '../Queries/GetVehicles';
import '../css/bikeRoutes.css';

import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

var currUserId = localStorage.getItem('currUserId');


const CREATE_ROUTE = gql`
  mutation createRoute($route: RouteInput!) {
    createRoute(route: $route){
      id
    }
  }
`;

class CreateBikeRoute extends Component {
  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.waypoints = [];
    this.from = {
      pos: {lat: 4.6381938, lng: -74.0862351},
      input: this.inputFrom
    };
    this.to = {
      pos: {lat: 4.6154977, lng: -74.0704757},
      input: this.inputTo
    };

    this.renderMap(this.from.pos, this.to.pos);
    this.setMarkers(this.from, this.to);
    this.setWaypoints();
  }

  renderMap(fromPos, toPos) {
    this.map = new google.maps.Map(this.refs.map, {
      center: fromPos,
      styles: MapStyles,
      zoom: 15
    });
    let map = this.map;
    const addWaypoint = (pos, map) => this.addWaypoint(pos, map);

    google.maps.event.addListener(map, 'click', function(event) {
      addWaypoint(event.latLng, map);
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
    const setWaypoints = () => this.setWaypoints();

    if (input.id == "origin") marker.setIcon("/images/map-icons/green.png");
    marker.addListener('dragend', function() {
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({'location': marker.position}, function(results, status) {
        if (status === 'OK') {
          if (results[1])
            input.value = results[1].formatted_address.replace(', Bogotá','').replace(', Bogota','').replace(', Colombia','');
          else
            input.value = "Dirección no encontrada";
        } else {
          input.value = "No es posible buscar la dirección";
          console.log('Geocoder failed due to: ' + status);
        }
      });

      setWaypoints();
    });
    return marker;
  }

  addWaypoint(pos, map) {
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable: true,
      icon: "/images/map-icons/pink.png"
    });
    let waypoint = {
      location: pos,
      stopover: true
    };
    const changeWaypoint = (waypoint, pos) => this.changeWaypoint(waypoint, pos);
    const deleteWaypoint = (waypoint) => this.deleteWaypoint(waypoint);

    marker.addListener('dragend', function(event){
      changeWaypoint(waypoint, event.latLng);
    });
    marker.addListener('click', function(){
      deleteWaypoint(waypoint);
      this.setMap(null);
    });

    this.waypoints.push(waypoint);
    this.setWaypoints();
  }

  changeWaypoint(waypoint, pos) {
    let index = this.waypoints.indexOf(waypoint);
    waypoint.location = pos;
    this.waypoints[index] = waypoint;
    this.setWaypoints();
  }

  deleteWaypoint(waypoint) {
    let index = this.waypoints.indexOf(waypoint);
    this.waypoints.splice(index, 1);;
    this.setWaypoints();
  }

  setWaypoints() {
    let directionsService = this.directionsService;
    let directionsDisplay = this.directionsDisplay;
    let from = this.markers[0].position;
    let to = this.markers[1].position;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setOptions({ suppressMarkers: true });

    directionsService.route({
      origin: from,
      destination: to,
      waypoints: this.waypoints,
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
    this.setWaypoints();
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
          let vehicle = $('#vehicleSelect').val();

          this.props.createRoute({ variables: {
            route: {
              user_id: currUserId,
              car_id: vehicle,
              title: this.inputTitle.value,
              description: this.inputDescription.value,
              from_lat: originLat,
              from_lng: originLng,
              to_lat: destinationLat,
              to_lng: destinationLng,
              waypoints:JSON.stringify(this.waypoints),
              departure: this.inputDate.value,
              cost: this.inputCost.value,
              users_in_route: "",
              active: true,
              spaces_available:this.inputSpaces.value
            }
          } });
        }}>
          <Form.Field>
            <label>Nombre de la ruta:</label>
            <input ref={node => {this.inputTitle = node;}} required/>
          </Form.Field>
          <Form.Field>
            <label>Descripción:</label>
            <input ref={node => {this.inputDescription = node;}} required/>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label><i className="green point icon"></i> Origen:</label>
              <input id="origin" ref={node => {this.inputFrom = node;}} onBlur={this.goToPos.bind(this)} required />
            </Form.Field>
            <Form.Field>
              <label><i className="red point icon"></i> Destino:</label>
              <input id="destination" ref={node => {this.inputTo = node;}} onBlur={this.goToPos.bind(this)} required />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="9">
              <label>Fecha:</label>
              <input type="datetime-local" ref={node => {this.inputDate = node;}} required />
            </Form.Field>
            <Form.Field width="4">
              <label>Precio:</label>
              <input type="number" ref={node => {this.inputCost = node;}} required />
            </Form.Field>
            <Form.Field width="3">
              <label>Cupos:</label>
              <input type="number" ref={node => {this.inputSpaces = node;}} required />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Vehiculo:</label>
            <MyVehicles/>
            {/* <input type="number" ref={node => {this.inputVehicle = node;}} /> */}
          </Form.Field>
          <Button color="teal" fluid={true} type="submit">Crear</Button>
          {this.props.error ? <p>Hubo un error! Intenta de nuevo</p> : this.props.called && <Redirect to='/my-routes'/>}
        </Form>

        <div id="map" ref="map"></div>
      </div>
    );
  }
};


class CreateRoute extends Component {
  render() {
    return(
      <div>
        <br/><br/>
        <h2 className="section-heading"><i className="plus icon"></i> Nueva Ruta de Carpool</h2>
        <h3 className="section-subheading">Crea tu propia ruta para que ganes algo de dinero extra llevando a otros</h3>


        <Mutation mutation={CREATE_ROUTE}>
         {(createRoute, { loading, error, called }) => (
           <CreateBikeRoute createRoute={createRoute} loading={loading} error={error} called={called} />
         )}
        </Mutation>
      </div>
    )
  }
}


export default CreateRoute;

/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import MapStyles from '../BikeRoutes/mapStyles';
import { MyVehicles } from '../Queries/GetVehicles';
import '../css/bikeRoutes.css';

import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

var currUserId = localStorage.getItem('currUserId');
var fromLng, fromLat, toLng, toLat, id, title, description, cost, spaces_available, time;

const UPDATE_ROUTE = gql`
  mutation updateRoute($id: Int!, $route: RouteInput!) {
    updateRoute(id: $id, route: $route){
      id
    }
  }
`;
const GET_INFO_ROUTE = gql`
  	query routeById($routeid: Int!){
	    routeById(id: $routeid){
	    	id
			title
	    	description
	    	cost
	    	departure
	    	user_id
	    	car_id
	    	spaces_available
	    	users_in_route
	        from_lat
	        from_lng
	        to_lat
	        to_lng
	        waypoints
	    }
  	}
`;

class UpdateRoute extends Component {
  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.waypoints = [];
    this.from = {
      pos: {lat: fromLat, lng: fromLng},
      input: this.inputFrom
    };
    this.to = {
      pos: {lat: toLat, lng: toLng},
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
          this.props.updateRoute({ variables: {
          	id: id,
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
            <input ref={node => {this.inputTitle = node;}} required defaultValue={title} />
          </Form.Field>
          <Form.Field>
            <label>Descripción:</label>
            <input ref={node => {this.inputDescription = node;}} required defaultValue={description} />
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
              <input type="datetime-local" ref={node => {this.inputDate = node;}} required defaultValue={time} />
            </Form.Field>
            <Form.Field width="4">
              <label>Precio:</label>
              <input type="number" ref={node => {this.inputCost = node;}} required defaultValue={cost} />
            </Form.Field>
            <Form.Field width="3">
              <label>Cupos:</label>
              <input type="number" ref={node => {this.inputSpaces = node;}} required value={spaces_available} disabled />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Vehiculo:</label>
            <MyVehicles/>
            {/* <input type="number" ref={node => {this.inputVehicle = node;}} /> */}
          </Form.Field>
          <Button color="teal" fluid={true} type="submit">Actualizar</Button>
          {this.props.error ? <p>Hubo un error! Intenta de nuevo</p> : this.props.called && <Redirect to='/my-routes'/>}
        </Form>

        <div id="map" ref="map"></div>
      </div>
    );
  }
};

const EditRoute = ({ match }) => {
    return(
		<Query query={GET_INFO_ROUTE} variables={{ routeid: match.params.routeid }}>
      		{({ loading, error, data }) => {
        		if (loading) return "CARGANDO INFORMACIÓN DE LA RUTA...";
        		if (error) return `Error! ${error.message}`;
        		var isDriver = false;
		        if(data.routeById.user_id == currUserId) isDriver = true;
		        fromLng = data.routeById.from_lng;
		        fromLat = data.routeById.from_lat;
		        toLng = data.routeById.to_lng;
		        toLat = data.routeById.to_lat;
		        title = data.routeById.title;
		        description = data.routeById.description;
		        cost = data.routeById.cost;
		        spaces_available = data.routeById.spaces_available;
		        time = data.routeById.departure.substring(0, 16);
		        id = match.params.routeid;
		        return (
		        	<div>
		        		{isDriver ? (
		        			<div>
						        <br/><br/>
						        <h2 className="section-heading"><i className="edit icon"></i> Actualización de Ruta de Carpool</h2>
						        <h3 className="section-subheading">Actualiza la información de tu ruda de Carpool.</h3>

						        <Mutation mutation={UPDATE_ROUTE}>
						         {(updateRoute, { loading, error, called }) => (
						           <UpdateRoute updateRoute={updateRoute} loading={loading} error={error} called={called} />
						         )}
						        </Mutation>
						    </div>
						):(
              				<Redirect to={`/route/${data.routeById.id}`}/>
            			)}
				    </div>
				);
        	}}
        </Query>
    )
}

export default EditRoute;

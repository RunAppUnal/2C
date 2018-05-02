/* eslint-disable */
import React, { Component } from 'react';
import MapStyles from './mapStyles';
import '../css/bikeRoutes.css';
import { Button, Form } from 'semantic-ui-react'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import $ from 'jquery';
import { Link, Redirect } from "react-router-dom";

var currUserId = localStorage.getItem('currUserId');
var fromLng, fromLat, toLng, toLat, originAddr, destinationAddr, time, id;

const UPDATE_BIKE_ROUTE = gql`
  mutation updateBikeRoute($id: ID!, $bikeRoute: BikeRouteInput!) {
    updateBikeRoute(id: $id, bikeRoute: $bikeRoute){
      id
    }
  }
`;
const GET_INFO_ROUTE = gql`
    query bikeRoutesById($routeid: ID!){
      bikeRoutesById(id: $routeid){
        id
        user_id
        time
        similar_routes {
          id
        }
        origin
        destination
        originAddr
        destinationAddr
        route_points {
          type
        }
        route_distance
      }
    }
`;

class UpdateBikeRoute extends Component {
  componentDidMount() {
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
            input.value = results[1].formatted_address.replace(', Bogotá','').replace(', Bogota','').replace(', Colombia','');
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
          
          this.props.updateBikeRoute({ variables: {
            id: id,
            bikeRoute: {
              user_id: currUserId,
              origin: [originLng, originLat],
              destination: [destinationLng, destinationLat],
              originAddr: this.inputFrom.value,
              destinationAddr: this.inputTo.value,
              time: this.inputTime.value
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
          <Form.Field width="10">
            <label>Fecha de Salida:</label>
            <input type="datetime-local" ref={node => {this.inputTime = node;}} />
          </Form.Field>
          <Button color="teal" fluid={true} floated="right" type="submit">Actualizar</Button>
          {this.props.error ? <p>Hubo un error! Intenta de nuevo</p> : this.props.called && <Redirect to={`/bikeRoutes/${id}`}/>}
          
        </Form>

        <div id="map" ref="map"></div>

      </div>
    );
  }
};

const EditBikeRoute = ({ match }) => {
  var matchParam = match.params.routeid;
  return (
    <Query query={GET_INFO_ROUTE} variables={{ routeid: match.params.routeid }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO INFORMACIÓN DE LA RUTA...";
        if (error) return `Error! ${error.message}`;
        var isDriver = false;
        if(data.bikeRoutesById.user_id == currUserId) isDriver = true;
        fromLng = data.bikeRoutesById.origin[0];
        fromLat = data.bikeRoutesById.origin[1];
        toLng = data.bikeRoutesById.destination[0];
        toLat = data.bikeRoutesById.destination[1];
        originAddr = data.bikeRoutesById.originAddr;
        destinationAddr = data.bikeRoutesById.destinationAddr;
        time = data.bikeRoutesById.time.substring(0, 16);
        id = match.params.routeid;
        return (
          <div>
            {isDriver ? (
              <div>
                <br/><br/>
                <h2 className="section-heading"><i className="edit icon"></i> Actualiza tu ruta en Bici</h2>
                <h3 className="section-subheading">Modifica la información de tu ruta en bicicleta.</h3>
                <Mutation mutation={UPDATE_BIKE_ROUTE}>
                  {(updateBikeRoute, { loading, error, called }) => (
                    <UpdateBikeRoute updateBikeRoute={updateBikeRoute} loading={loading} error={error} called={called} />
                  )}
                </Mutation>
              </div>
            ):(
              <Redirect to={`/bikeRoutes/${data.bikeRoutesById.id}`}/>
            )}
          </div>
        );
      }}
    </Query>
  )
};

export default EditBikeRoute;

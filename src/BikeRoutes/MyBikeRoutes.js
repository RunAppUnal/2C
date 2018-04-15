/* eslint-disable */
import React, { Component } from 'react';
import { Button, Card, Dimmer, Loader } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";
import registerServiceWorker from '../registerServiceWorker';
import '../css/bikeRoutes.css';

import { Query } from "react-apollo";
import gql from "graphql-tag";


var currUserId = localStorage.getItem('currUserId');

const GET_ALL_BIKE_ROUTES = gql`
  {
    allBikeRoutes{
      id
      user_id
      route_distance
      origin
      destination
      time
    }
  }
`;
const GET_USER_DATA = gql`
  query userById($userid: Int!){
    userById(userid: $userid){
      name
      lastname
      username
      email
    }
  }
`;

const GetUserName = (data) => {
  return (
    <Query query={GET_USER_DATA} variables={{ userid: data.userId }}>
      {({ loading, error, data }) => {
        if (loading) return "Cargando...";
        if (error) return `Error! ${error.message}`;

        return (
          <span>
            {data.userById.name} {data.userById.lastname}
          </span>
        );
      }}
    </Query>
  )
};

const GeocodeLatLng = (latlng) => {
  let geocoder = new google.maps.Geocoder();
  var text;
  console.log(latlng.latlng);

  geocoder.geocode({'location': latlng.latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]){
        let result = results[1].formatted_address.replace(', Bogotá','').replace(', Bogota, Colombia','')
        console.log(result);
      }

      else
      console.log('No results found');
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  });

  return (<h6>Origen - Destino</h6>)
};

const My_Bike_Routes = () => (
  <Query query={GET_ALL_BIKE_ROUTES}>
    {({ loading, error, data }) => {
      if (loading) return "CARGANDO TUS RUTAS...";
      if (error) return `Error! ${error.message}`;
      var time = (date) => `${date.getHours()%12}:${date.getMinutes()}${date.getHours()>12 ? "pm" : "am"}`
      return (
        <Card.Group stackable itemsPerRow="four">
        {
          data.allBikeRoutes.map(route =>
            <div>
              {route.user_id == currUserId ? (
                <Card
                  href={`/bikeRoutes/${route.user_id}`}
                  header={<GeocodeLatLng latlng={{lat: route.origin[1], lng: route.origin[0]}} />}
                  meta={<GetUserName userId={route.user_id} />}
                  extra={`Hora Salida: ${time(new Date(route.time))}`}
                />
              ): (
                <div></div>              
              )}
          </div>
            
        )
        }
        </Card.Group>
      );
    }}
  </Query>
);

class MyBikeRoutes extends Component {
  render() {
    return (
      <div>
        <br/><br/>
        <My_Bike_Routes />
      </div>
    );
  }
}

export default MyBikeRoutes;
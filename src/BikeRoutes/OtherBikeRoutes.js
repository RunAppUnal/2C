/* eslint-disable */
import React, { Component } from 'react';
import { Button, Card, Dimmer, Loader } from 'semantic-ui-react'
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import ShowOtherBikeRoutes from './ShowOtherBikeRoutes';
import ShowMyBikeRoutes from './ShowMyBikeRoutes';
import AddBikeRoute from './AddBikeRoute';
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

const AllBikeRoutes = () => (
  <Query query={GET_ALL_BIKE_ROUTES}>
    {({ loading, error, data }) => {
      if (loading) return "CARGANDO OTRAS RUTAS...";
      if (error) return `Error! ${error.message}`;
      var time = (date) => `${date.getHours()%12}:${date.getMinutes()}${date.getHours()>12 ? "pm" : "am"}`
      return (
        <Card.Group stackable itemsPerRow="four">
        {
          data.allBikeRoutes.map(route => {
            geocode({lat: route.origin[1], lng: route.origin[0]}, "originAddr");
            geocode({lat: route.destination[1], lng: route.destination[0]}, "destinationAddr");

            return(
              <div>
                {route.user_id != currUserId ? (
                  <Card
                    href={`/bikeRoutes/${route.user_id}`}
                    header={`${localStorage.getItem('originAddr')} - ${localStorage.getItem('destinationAddr')}`}
                    meta={<GetUserName userId={route.user_id} />}
                    extra={`Hora Salida: ${time(new Date(route.time))}`}
                  />
                ): (
                  <div></div>
                )}
              </div>
            )
          })
        }
        </Card.Group>
      );
    }}
  </Query>
);

class OtherBikeRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h2 className="section-heading"><i className="bicycle icon"></i> Rutas en Bici</h2>
              <h3 className="section-subheading">Encuentra una ruta que se parezca a la tuya</h3>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2"></div>

            <div className="col-sm-8 col-md-8 col-lg-8">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/bikeRoutes/" className="nav-link"><i className="fa fa-eye"></i> Rutas de otros usuarios</NavLink>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/my-bikeRoutes" className="nav-link"><i className="fa fa-search"></i> Mis rutas</NavLink>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/bikeRoutes/new" className="nav-link"><i className="fa fa-plus"></i> Crear ruta</NavLink>
                </div>
              </div>
            </div>

            <div className="col-sm-2 col-md-2 col-lg-2"></div>
          </div>
          <div>
            <div className="content">
              <Route exact path="/bikeRoutes/" component={ShowOtherBikeRoutes}/>
              <Route exact path="/my-bikeRoutes" component={ShowMyBikeRoutes}/>
              <Route exact path="/bikeRoutes/new" component={AddBikeRoute}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default OtherBikeRoutes;

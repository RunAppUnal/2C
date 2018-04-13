import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import RouteInfo from './RouteInfo'
import { withAuth } from "../auth";
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

var currUserId = localStorage.getItem('currUserId');

const GET_OTHER_ROUTES = gql`
  query otherRoutes($userid: Int!){
    otherRoutes(userid: $userid){
      id
      title
      description
      departure
      cost
      users_in_route
      spaces_available
    }
  }
`;

const Other_Routes = withAuth(({ auth }) => {
  return (
    <Query query={GET_OTHER_ROUTES} variables={{ userid: currUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO OTRAS RUTAS...";
        if (error) return `Error! ${error.message}`;
        return (
          <Router>
            <table>
              <thead>
                <tr>
                  <th><b>Título</b></th>
                  <th><b>Descripción</b></th>
                  <th><b>Fecha</b></th>
                  <th><b>Precio</b></th>
                  <th><b>Pasajeros</b></th>
                  <th><b>Cupos</b></th>
                  <th><b>Detalles</b></th>
                </tr>
              </thead>
              <tbody>
                {data.otherRoutes.map(route =>
                  <tr>
                    <td>{route.title}</td>
                    <td>{route.description}</td>
                    <td>{route.departure}</td>
                    <td>{route.cost}</td>
                    <td>{route.users_in_route}</td>
                    <td>{route.spaces_available}</td>
                    <td><NavLink to={`/route/${route.id}`}>ver</NavLink></td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </Router>
        );
      }}
    </Query>
  )
});

const Routes = () => (
  <Other_Routes/>
);

class OtherRoutes extends Component {
  render() {
    return (
      <div>
      	<h2>Rutas creadas por otros usuarios.</h2>
        <Routes/>
        
      </div>
    );
  }
}

export default OtherRoutes;

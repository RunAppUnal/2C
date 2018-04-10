/* eslint-disable */
import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import { withAuth } from "../auth";

import { Query } from "react-apollo";
import gql from "graphql-tag";


var currUserId = localStorage.getItem('currUserId');

const GET_OTHER_ROUTES = gql`
  query otherRoutes($userid: Int!){
    otherRoutes(userid: $userid){
      title
      description
      departure
      cost
      users_in_route
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
          <table>
            <thead>
              <tr>
                <th><b>Título</b></th>
                <th><b>Descripción</b></th>
                <th><b>Fecha</b></th>
                <th><b>Precio</b></th>
                <th><b>Pasajeros</b></th>
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
                </tr>
              )}
            </tbody>
          </table>
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

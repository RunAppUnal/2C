/* eslint-disable */
import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import '../css/profile.css';
import { withAuth } from "../auth";
import registerServiceWorker from '../registerServiceWorker';

import { Query } from "react-apollo";
import gql from "graphql-tag";


var currUserId = localStorage.getItem('currUserId');

const GET_MY_ROUTES = gql`
  query myRoutes($userid: Int!){
    myRoutes(userid: $userid){
      title
      description
      departure
      cost
      users_in_route
    }
  }
`;

const My_Routes = withAuth(({ auth }) => {
  return (
    <Query query={GET_MY_ROUTES} variables={{ userid: currUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO TUS RUTAS...";
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
              {data.myRoutes.map(route =>
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
  <My_Routes/>
);

class MyRoutes extends Component {
  render() {
    return (
      <div>
          <h3>Mis rutas</h3>
          <Routes />
      </div>
    );
  }
}

export default MyRoutes;

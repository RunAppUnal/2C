/* eslint-disable */
import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import { withAuth } from "../auth";
import registerServiceWorker from '../registerServiceWorker';

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

const AllBikeRoutes = () => (
  <Query query={GET_ALL_BIKE_ROUTES}>
    {({ loading, error, data }) => {
      if (loading) return "CARGANDO OTRAS RUTAS...";
      if (error) return `Error! ${error.message}`;
      return (
        <Card.Group>
          {/* <thead>
            <tr>
              <th><b>ID</b></th>
              <th><b>Creador</b></th>
              <th><b>Origen</b></th>
              <th><b>Destino</b></th>
              <th><b>Fecha</b></th>
            </tr>
          </thead> */}
          {data.allBikeRoutes.map(route =>
            <Card
              href={route.user_id}
              // image='/assets/images/avatar/large/elliot.jpg'
              header={route.origin}
              meta={route.user_id}
              description={route.destination}
              extra={route.time}
            />
          )}
        </Card.Group>
      );
    }}
  </Query>
);

class OtherBikeRoutes extends Component {
  render() {
    return (
      <AllBikeRoutes />
    );
  }
}

export default OtherBikeRoutes;

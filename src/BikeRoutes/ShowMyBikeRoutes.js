/* eslint-disable */
import React, { Component } from 'react';
import { Button, Card, Dimmer, Loader } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";
import { Map, geocode } from './Map';
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
      originAddr
      destinationAddr
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

const My_Bike_Routes = () => (
  <Query query={GET_ALL_BIKE_ROUTES}>
    {({ loading, error, data }) => {
      if (loading) return "CARGANDO TUS RUTAS...";
      if (error) return `Error! ${error.message}`;
      var now = new Date();
      now.setHours(now.getHours() - 5);
      var today = now.toISOString();
      var time = (date) => `${date.getHours()%12}:${date.getMinutes()}${date.getHours()>12 ? "pm" : "am"}`
      return (
        <Card.Group stackable itemsPerRow="4">
        {
          data.allBikeRoutes.map(route => {
            let originAddr = route.originAddr;
            let destinationAddr = route.destinationAddr;

            return (
              <div>
                {route.user_id == currUserId ? (
                  <div id="bikeCard">
                    <div id="bikeState">
                      {today <= route.time ? (
                        <svg height="18" width="18" title="Disponible">
                          <circle cx="12" cy="12" r="6" fill="#46f711">
                            <title>Disponible</title>
                          </circle>
                        </svg> 
                      ) : (
                        <svg height="30" width="30" title="Disponible">
                          <circle cx="12" cy="12" r="6" fill="red">
                            <title>No disponible</title>
                          </circle>
                        </svg> 
                      )}
                    </div>
                    <Card
                      href={`/bikeRoutes/${route.id}`}
                      header={`${originAddr} - ${destinationAddr}`}
                      meta={<GetUserName userId={route.user_id} />}
                      extra={`Salida: ${
                        route.time.substring(8, 10) + '/' + route.time.substring(5, 7)+ '/' +
                        route.time.substring(0, 4) + ' - ' + route.time.substring(11, 16)}`
                      }
                    />
                  </div>
                ): (
                  <div></div>
                )}
              </div>
            )
          }

        )
        }
        </Card.Group>
      );
    }}
  </Query>
);

class ShowMyBikeRoutes extends Component {
  render() {
    return (
      <div>
        <br/><br/>
        <My_Bike_Routes />
      </div>
    );
  }
}

export default ShowMyBikeRoutes;

import React, { Component } from 'react';
import logo from './logolong.png';
import { Button, Menu, Image } from 'semantic-ui-react'
import './profile.css';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://192.168.99.102:8000/graphql",
  connectToDevTools: true
});

const GET_MY_CARS = gql`
  {
    myVehicles(user:1){
      plate
      brand
      color
      model
      capacity
    }
  }
`;

const GET_MY_INFO = gql`
  {
    userById(userid:1){
      name
      lastname
      username
      email
    }
  }
`;

client.query({query: GET_MY_INFO}).then(data => console.log(data));

const MyVehicles = ({ onVehicleSelected }) => (
  <Query query={GET_MY_CARS}>
    {({ loading, error, data }) => {
      if (loading) return "CARGANDO TUS VEHÍCULOS...";
      if (error) return `Error! ${error.message}`;
      return (
        <table>
          <thead>
            <tr>
              <th><b>Placa</b></th>
              <th><b>Marca</b></th> 
              <th><b>Modelo</b></th>
              <th><b>Color</b></th>
              <th><b>Capacidad</b></th>
            </tr>
          </thead>
          <tbody>
            {data.myVehicles.map(vehicle => 
              <tr>
                <td>{vehicle.plate}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.capacity}</td>
              </tr>  
            )}
          </tbody>          
        </table>       



      );
    }}
  </Query>
);

const MyInfo = ({ onUserSelected }) => (
  <Query query={GET_MY_INFO}>
    {({ loading, error, data }) => {
      if (loading) return "Cargando...";
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <p><b>Nombre:</b> {data.userById.name} {data.userById.lastname}</p>
          <p><b>Usuario:</b> {data.userById.username}</p>
          <p><b>Correo:</b> {data.userById.email}</p>
        </div>
      );
    }}
  </Query>
);

const Vehicles = () => (
  <ApolloProvider client={client}>
    <MyVehicles/>
  </ApolloProvider>
);
const Info = () => (
  <ApolloProvider client={client}>
    <MyInfo/>
  </ApolloProvider>
);

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <h1>Perfil de ususario.</h1>
          <h3>Información personal</h3>
          <Info/>
          <h3>Mis vehículos</h3>
          <Vehicles />
        </div>
      </div>
    );
  }
}

export default Profile;

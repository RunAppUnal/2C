import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import './css/profile.css';
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

const GET_MY_ROUTES = gql`
  {
    myRoutes(userid:1){
      title
      description
      departure
      cost
      users_in_route
      spaces_avaible
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

const MyRoutes = ({ onRouteSelected }) => (
  <Query query={GET_MY_ROUTES}>
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
              <th><b>Cupos</b></th>
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
                <td>{route.spaces_avaible}</td>
              </tr>  
            )}
          </tbody>          
        </table>
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
const Routes = () => (
  <ApolloProvider client={client}>
    <MyRoutes/>
  </ApolloProvider>
);

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <h1>Perfil del ususario.</h1>
          <h3>Información personal</h3>
          <Info/>
          <h3>Mis vehículos</h3>
          <Vehicles />
          <h3>Mis rutas</h3>
          <Routes />
        </div>
      </div>
    );
  }
}

export default Profile;
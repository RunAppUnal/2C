import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import '../css/myVehicle.css';
import registerServiceWorker from '../registerServiceWorker';

import { Query } from "react-apollo";
import gql from "graphql-tag";


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

const My_Vehicles = ({ onVehicleSelected }) => (
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

const Vehicles = () => (
  <My_Vehicles/>
);

class MyVehicles extends Component {
  render() {
    return (
      <div>

      	<h2>Mis vehículos</h2>
        <Vehicles/>
      </div>
    );
  }
}

export default MyVehicles;

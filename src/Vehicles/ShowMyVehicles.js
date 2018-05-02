/* eslint-disable */
import React, { Component } from 'react';
import { DeleteVehicle } from '../Queries/GetVehicles';
import { MyRoutes } from '../Queries/GetRoutes';
import { withAuth } from "../auth";
import '../css/vehicleAndRoute.css';

import { Query } from "react-apollo";
import gql from "graphql-tag";


var currUserId = localStorage.getItem('currUserId');

const GET_MY_CARS = gql`
  query myVehicles($userid: Int!){
    myVehicles(user: $userid){
      id
      plate
      brand
      color
      model
      capacity
    }
  }
`;

const My_Vehicles = withAuth(({ auth }) => {
  return (
    <Query query={GET_MY_CARS} variables={{ userid: currUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO TUS VEHÍCULOS...";
        if (error) return `Error! ${error.message}`;
        return (
          <table id="vehiclesTable">
            <thead>
              <tr>
                <th><b>Placa</b></th>
                <th><b>Marca</b></th>
                <th><b>Modelo</b></th>
                <th><b>Color</b></th>
                <th><b>Capacidad</b></th>
                <th><b>Acciones</b></th>
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
                  <td>
                    <div class="row" id="editDeleteVehicle">
                      <div class="col-sm-6 col-md-6 col-lg-6">
                        <DeleteVehicle id={vehicle.id}  />
                      </div>
                      <div class="col-sm-6 col-md-6 col-lg-6">
                        <a href={`/profile/my-vehicles/${vehicle.id}/edit`}><button class="btn btn-outline-primary" id="addUserToRouteBtn"> Editar</button></a>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        );
      }}
    </Query>
  )
});

const Vehicles = () => (
  <My_Vehicles/>
);

class MyVehicles extends Component {
  render() {
    return (
      <div>
      	<Vehicles/>
      </div>
    );
  }
}

export default MyVehicles;

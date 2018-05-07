import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

import { Query, Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import $ from 'jquery';

var currUserId = localStorage.getItem('currUserId');


const GET_MY_VEHICLES = gql`
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

class MyVehicles extends Component {
  render() {
    return (
      <Query query={GET_MY_VEHICLES} variables={{ userid: currUserId }}>
        {({ loading, error, data }) => {
          if (loading) return "CARGANDO TUS VEHÍCULOS...";
          if (error) return `Error! ${error.message}`;
          return (
            <select id="vehicleSelect">
              {data.myVehicles.map(vehicle =>
                <option value={vehicle.id}>
                  {`(${vehicle.plate}) ${vehicle.brand} ${vehicle.model} ${vehicle.color}`}
                </option>
              )}
            </select>
          );
        }}
      </Query>
    )
  }
}


const GET_VEHICLE_DATA = gql`
  query vehicleById($userid: Int!){
    vehicleById(id: $userid){
      plate
      user_id
      kind
      model
      color
      capacity
      brand
    }
  }
`;

class GetVehicle extends Component {
  render() {
    let userid = this.props.userId;

    return (
      <Query query={GET_VEHICLE_DATA} variables={{ userid: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return "Cargando...";
          if (error) return `Error! ${error.message}`;
          const extra = (
            <div>
              <h6 style={{display:"inline-block"}}>Color:</h6> {data.vehicleById.color} <br/>
              <h6 style={{display:"inline-block"}}>Capacidad:</h6> {data.vehicleById.capacity}
            </div>
          )

          return (
            <Card
              image={`/images/cars/car_${this.props.id%6}.jpg`}
              header={`${data.vehicleById.brand} - ${data.vehicleById.model}`}
              meta={data.vehicleById.kind}
              description={extra}
            />
          );
        }}
      </Query>
    )
  }
};


const DELETE_VEHICLE = gql`
  mutation deleteVehicle($id: Int!){
    deleteVehicle(id: $id){
      id
    }
  }
`;

class DeleteVehicle extends Component {
  componentDidMount() {
    $('#removeButton').click(function(){
  		window.location.reload(true);
  	});
  }

  render() {
    return (
      <Mutation mutation={DELETE_VEHICLE} variables={{ id: this.props.id }} >
        {( deleteVehicle , {loading, error, data, called }) => (
        <button onClick ={ deleteVehicle } className="btn btn-outline-danger" id="removeButton">Eliminar</button>
        )}
      </Mutation>
    )
  }
}



export { MyVehicles, DeleteVehicle, GetVehicle };

import React, { Component } from 'react';
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



export { MyVehicles, DeleteVehicle };

import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_MY_VEHICLES = gql`
  query myVehicles($userid: Int!){
    myVehicles(user: $userid){
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
            <div>
              {data.myVehicles.map(vehicle =>
                <span>
                  {`(${vehicle.plate}) ${vehicle.brand} ${vehicle.model} ${vehicle.color}`}
                </span>
              )}
            </div>
          );
        }}
      </Query>
    )
  }
}

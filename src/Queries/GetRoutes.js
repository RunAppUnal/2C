import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import $ from 'jquery';

var currUserId = localStorage.getItem('currUserId');


const GET_MY_ROUTES = gql`
  query myRoutes($userid: Int!){
    myRoutes(userid: $userid){
      id
      title
      description
      departure
      cost
      users_in_route
      spaces_available
    }
  }
`;

function MyRoutes() {
  return(
    <Query query={GET_MY_ROUTES} variables={{ userid: currUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO TUS RUTAS...";
        if (error) return `Error! ${error.message}`;
        console.log("inside: ", data.myRoutes);
        return data.myRoutes;
      }}
    </Query>
  )
};


const DELETE_ROUTE = gql`
  mutation deleteVehicle($id: Int!){
    deleteVehicle(id: $id){
      id
    }
  }
`;

class DeleteVehicleRoutes extends Component {
  componentDidMount() {
    $('#removeButton').click(function(){
  		window.location.reload(true);
  	});
  }

  render() {
    return (
      <Mutation mutation={DELETE_ROUTE} variables={{ id: this.props.id }} >
        {( deleteVehicle , {loading, error, data, called }) => (
          <div>
            <button onClick ={ deleteVehicle } className="btn btn-outline-danger" id="removeButton">Eliminar</button>
          </div>
        )}
      </Mutation>
    )
  }
}



export { MyRoutes, DeleteVehicleRoutes };

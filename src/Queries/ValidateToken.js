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



export { MyRoutes, DeleteVehicleRoutes };

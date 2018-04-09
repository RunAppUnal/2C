/* eslint-disable */
import React, { Component } from 'react';
import '../css/profile.css';
import { withAuth } from "../auth";
import registerServiceWorker from '../registerServiceWorker';

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_MY_INFO = gql`
  query userById($userid: Int!){
    userById(userid: $userid){
      name
      lastname
      username
      email
    }
  }
`;

const My_Info = withAuth(({ auth }) => {
  return (
    <Query query={GET_MY_INFO} variables={{ userid: auth.userid }}>
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
  )
});

const Info = () => (
  <My_Info/>
);

class MyInfo extends Component {
  render() {
    return (
      <div>
        <h3>Información personal</h3>
        <Info/>
      </div>
    );
  }
}

export default MyInfo;

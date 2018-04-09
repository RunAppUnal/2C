/* eslint-disable */
import React, { Component } from 'react';
import '../css/myInfo.css';
import { withAuth } from "../auth";
import registerServiceWorker from '../registerServiceWorker';
//import deleteUserAccount from '../MyInfo/DeleteAccount'
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
    <Query query={GET_MY_INFO} variables={{ userid: 2 }}>
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
        <div>
          <h3>Información personal</h3>
          <Info/>
        </div>
        <div class="removeCountBtn">
          <button class="btn btn-danger">Eliminar cuenta</button>
        </div>
      </div>
    );
  }
}

export default MyInfo;

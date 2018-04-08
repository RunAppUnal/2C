import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import '../css/profile.css';
import registerServiceWorker from '../registerServiceWorker';

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://192.168.99.102:8000/graphql",
  connectToDevTools: true
});

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

const My_Info = ({ onUserSelected }) => (
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

const Info = () => (
  <ApolloProvider client={client}>
    <My_Info/>
  </ApolloProvider>
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
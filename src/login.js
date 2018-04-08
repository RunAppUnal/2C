import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { NavLink } from 'react-router-dom'


const client = new ApolloClient({
  uri: "http://192.168.99.101:8000/graphql"
});

const Login = () => (
  <ApolloProvider client={client}>
    <h1 className="ui centered header">Iniciar Sesión:</h1>
    <h4 className="ui centered header">
      ¿Eres nuevo en Runapp? <NavLink to="/signup">Regístrate</NavLink>
    </h4>

  </ApolloProvider>
);

export default Login;

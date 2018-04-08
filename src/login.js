/* eslint-disable */
import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import './css/signup.css';
import { update, withAuth } from "./auth";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link, Redirect } from 'react-router-dom'


const LOGIN_USER= gql`
  mutation loginUser($username: String!, $password: String!){
    login(
       username: $username,
       password: $password
    ){
       userid
       username
       email
       name
       lastname
    }
  }
`;

const LoginUser = () => {
  let inputUsername, inputPassword;

  return (
    <Mutation mutation={LOGIN_USER} ignoreResults={false} >
      {(loginUser, { loading, error, data, called }) => (
        <div>
          <Form onSubmit={e => {
              e.preventDefault();
              loginUser({ variables: {
                username: inputUsername.value,
                password: inputPassword.value
              } })
              .then(data => update(data.data.login));;
            }}>
            <Form.Field>
              <label>Usuario</label>
              <input ref={node => {inputUsername = node;}} />
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <input ref={node => {inputPassword = node;}} />
            </Form.Field>
            <Button type='submit'>Iniciar Sesión</Button>
          </Form>
          {loading && <p>Loading...</p>}
          {error ? <p>Hubo un error! Intenta de nuevo</p> : called && <Redirect to='/'/>}
        </div>
      )}
    </Mutation>
  );
};

const Login = () => (
  <div>
    <h1 className="ui centered header">Iniciar Sesión:</h1>
    <h4 className="ui centered header">
      ¿Eres nuevo en Runapp? <Link to="/signup">Regístrate</Link>
    </h4>
    <LoginUser/>
  </div>
);

const Logout = () => {
  update(null);
  return <Redirect to='/login'/>;
};

export { Login, Logout };

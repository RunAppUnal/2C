/* eslint-disable */
import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import './css/signup.css';

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { NavLink } from 'react-router-dom'

import {currentUser} from './index';


const GET_USER_BY_ID= gql`
  query userById($userid: Int!){
    userById(userid: $userid){
      userid
      username
      email
      name
      lastname
      cellphone
    }
  }
`;

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
      {(loginUser, { loading, error, data }) => (
        <div>
          <Form onSubmit={e => {
              e.preventDefault();
              loginUser({ variables: {
                username: inputUsername.value,
                password: inputPassword.value
              } })
              .then(data => (
                console.log(data.data.login)
              )
            );;
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
          {error && <p>Error :( Please try again</p>}
        </div>
      )}
    </Mutation>
  );
};

const Login = () => (
  <div>
    <h1 className="ui centered header">Iniciar Sesión:</h1>
    <h4 className="ui centered header">
      ¿Eres nuevo en Runapp? <NavLink to="/signup">Regístrate</NavLink>
    </h4>
    <LoginUser/>
  </div>
);

export default Login;

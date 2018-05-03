/* eslint-disable */
import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import '../css/signup.css';
import { update, withAuth } from "../auth";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link, Redirect } from 'react-router-dom'


const LOGIN_USER= gql`
  mutation login($email: String!, $password: String!){
    login(
       email: $email,
       password: $password
    ){
        id
        username
        email
        name
        lastname
    }
  }
`;
const LOGIN_USER2= gql`
mutation auth($email: String!, $password: String!){
  auth(auth:{
    email: $email,
    password: $password
  }) {
    email
    answer
  }
}
`;

const LoginUser = () => {
  let inputEmail, inputPassword;

  return (
    <Mutation mutation={LOGIN_USER2} ignoreResults={false} >
      {(auth, { loading, error, data, called }) => {
        return(
          <Mutation mutation={LOGIN_USER} ignoreResults={false} >
          {(login, { loading, error, data, called }) => (
            <div>
            <Form id="login" loading={loading} onSubmit={e => {
              e.preventDefault();
              auth({ variables: {
                email: inputEmail.value,
                password: inputPassword.value
              } })
              .then(data => {
                login({ variables: {
                  email: inputEmail.value + "@unal.edu.co",
                  password: inputPassword.value
                } })
                .then(data => {
                  localStorage.setItem('currUserId', data.data.login.id);
                  localStorage.setItem('currUserName', data.data.login.name);
                });
              });
            }}>
            <Form.Field>
            <label>Correo</label>
            <input ref={node => {inputEmail = node;}} />
            </Form.Field>
            <Form.Field>
            <label>Contraseña</label>
            <input type='password' ref={node => {inputPassword = node;}} />
            </Form.Field>
            <Button type='submit'>Iniciar Sesión</Button>
            </Form>
            {loading && <p>Loading...</p>}
            {error && <p>Hubo un error! Intenta de nuevo</p>}
            </div>
          )}
          </Mutation>
        )
      }}
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
  localStorage.setItem('currUserId', 0);
  return <Redirect to='/login'/>;
};

export { Login, Logout };

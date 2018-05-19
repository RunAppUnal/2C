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
        name
        token
        client
        uid
    }
  }
`;
const LOGIN_LDAP= gql`
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
    <Mutation mutation={LOGIN_LDAP} ignoreResults={false} >
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
              .then(auth => {
                let answer = auth.data.auth.answer;
                if(answer) {
                  login({ variables: {
                    email: inputEmail.value + "@unal.edu.co",
                    password: inputPassword.value
                  } })
                  .then(login => {
                    let user = login.data.login;
                    localStorage.setItem('currUserId', user.id);
                    localStorage.setItem('currUserName', user.name);
                    localStorage.setItem('currUserUid', user.uid);
                    localStorage.setItem('currUserToken', user.token);
                    localStorage.setItem('currUserClient', user.client);
                  });
                } else {
                }
              });
            }}>
            <Form.Field>
            <label>Usuario</label>
            <input ref={node => {inputEmail = node;}} required />
            </Form.Field>
            <Form.Field>
            <label>Contraseña</label>
            <input type='password' ref={node => {inputPassword = node;}} required />
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

export { Login };

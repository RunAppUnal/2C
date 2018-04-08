import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import './css/signup.css';

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { NavLink } from 'react-router-dom'


const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user:$user){
      userid
    }
  }
`;

const CreateUser = () => {
  let inputUsername, inputEmail, inputPassword, inputName, inputLastname, inputCellphone;

  return (
    <Mutation mutation={CREATE_USER}>
      {(createUser, { data }) => (
        <div>
          <Form onSubmit={e => {
              e.preventDefault();
              createUser({ variables: {
                user: {
                  username: inputUsername.value,
                  email: inputEmail.value,
                  password: inputPassword.value,
                  name: inputName.value,
                  lastname: inputLastname.value,
                  cellphone: inputCellphone.value,
                }
              } });
            }}>
            <Form.Field>
              <label>Nombre</label>
              <input ref={node => {inputName = node;}} />
            </Form.Field>
            <Form.Field>
              <label>Apellido</label>
              <input ref={node => {inputLastname = node;}} />
            </Form.Field>
            <Form.Field>
              <label>Usuario</label>
              <input ref={node => {inputUsername = node;}} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input ref={node => {inputEmail = node;}} />
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <input ref={node => {inputPassword = node;}} />
            </Form.Field>
            <Form.Field>
              <label>Celular</label>
              <input ref={node => {inputCellphone = node;}} />
            </Form.Field>
            <Button type='submit'>Registrarse</Button>
          </Form>
        </div>
      )}
    </Mutation>
  );
};

const Signup = () => (
  <div>
    <h1 className="ui centered header">Registrarse:</h1>
    <h4 className="ui centered header">
      ¿Ya habías venido por aquí? <NavLink to="/login">Iniciar Sesión</NavLink>
    </h4>
    <CreateUser/>
  </div>
);

export default Signup;

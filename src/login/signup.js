/* eslint-disable */
import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import '../css/signup.css';

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link, Redirect } from 'react-router-dom'


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
      {(createUser, { loading, error, called }) => (
        <div>
          <Form loading={loading} onSubmit={e => {
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
            {/* <Form.Group widths='equal'>
              <Form.Input label='Nombre' ref={node => {inputName = node;}} />
              <Form.Input label='Apellido' ref={node => {inputLastname = node;}} />
            </Form.Group>
            <Form.Input label='Usuario' ref={node => {inputUsername = node;}} />
            <Form.Group widths='equal'>
              <Form.Input label='Email' type='email' ref={node => {inputEmail = node;}} />
              <Form.Input label='Celular' type='tel' ref={node => {inputCellphone = node;}} />
            </Form.Group>
            <Form.Input label='Contraseña' type='password' ref={node => {inputPassword = node;}} /> */}
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Nombre</label>
                <input ref={node => {inputName = node;}} />
              </Form.Field>
              <Form.Field>
                <label>Apellido</label>
                <input ref={node => {inputLastname = node;}} />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Usuario</label>
              <input ref={node => {inputUsername = node;}} />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Email</label>
                <input type='email' ref={node => {inputEmail = node;}} />
              </Form.Field>
              <Form.Field>
                <label>Celular</label>
                <input type='tel' ref={node => {inputCellphone = node;}} />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Contraseña</label>
              <input type='password' ref={node => {inputPassword = node;}} />
            </Form.Field>
            <Button type='submit'>Registrarse</Button>
          </Form>
          {error ? <p>Hubo un error! Intenta de nuevo</p> : called && <Redirect to='/login'/>}
        </div>
      )}
    </Mutation>
  );
};

const Signup = () => (
  <div>
    <h1 className="ui centered header">Registrarse:</h1>
    <h4 className="ui centered header">
      ¿Ya habías venido por aquí? <Link to="/login">Iniciar Sesión</Link>
    </h4>
    <CreateUser/>
  </div>
);

export default Signup;

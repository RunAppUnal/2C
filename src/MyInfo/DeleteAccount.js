import React, { Component } from 'react';
import registerServiceWorker from '../registerServiceWorker';
import { Query, graphql, compose } from "react-apollo";
import gql from "graphql-tag";


const DELETE_USER = gql`
	mutation deleteUser($username: String!) {
    	deleteUser(username: $username) {
      		username
    	}
  	}
`;

/*
const RemoveUser = () => {
  let inputUsername;

  return (
    <Mutation mutation={DELETE_USER}>
      {(deleteUser, { loading, error, called }) => (
        <div>
          <Form onSubmit={e => {
              e.preventDefault();
              createVehicle({ variables: {
                username: {
                  username: inputUsername.value
                }
              } });
            }}>
            </Form>
          {error && <p>Hubo un error! Intenta de nuevo</p>}
        </div>
      )}
    </Mutation>
  );
};

const deleteUserAccount = () => (
  <div>
    <h1 className="ui centered header">Eliminar cuenta:</h1>
    <RemoveUser/>
  </div>
);

export default deleteUserAccount*/
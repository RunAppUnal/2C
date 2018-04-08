import React, { Component } from 'react';
import gql from "graphql-tag";
import './css/myVehicle.css';
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation addTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const AddTodo = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

class AddVehicle extends Component {
  render() {
    return (      
      <div>
        <h2>Agregar vehículo.</h2>
        hola mundo.
      </div>
    );
  }
}

export default AddVehicle;
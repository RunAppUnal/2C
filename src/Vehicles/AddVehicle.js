/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import '../css/myVehicle.css';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

var currUserId = localStorage.getItem('currUserId');

const CREATE_VEHICLE = gql`
  mutation createVehicle($vehicle: VehicleInput!) {
    createVehicle(vehicle: $vehicle){
      user_id
    }
  }
`;

const CreateVehicle = () => {
  let inputPlate, inputKind, inputModel, inputColor, inputCapacity, inputBrand;

  return (
    <Mutation mutation={CREATE_VEHICLE}>
      {(createVehicle, { loading, error, called }) => (
        <div>
          <Form loading={loading} onSubmit={e => {
              e.preventDefault();
              createVehicle({ variables: {
                vehicle: {
                  plate: inputPlate.value,
                  user_id: currUserId,
                  kind: inputKind.value,
                  model: inputModel.value,
                  color: inputColor.value,
                  capacity: inputCapacity.value,
                  image: "",
                  brand: inputBrand.value,
                }
              } });
            }}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Placa</label>
                <input ref={node => {inputPlate = node;}} />
              </Form.Field>
              <Form.Field>
                <label>Tipo</label>
                {/* <select ref={node => {inputKind = node;}}>
                  <option value="carro">Carro</option>
                  <option value="Moto">Moto</option>
                </select> */}
                <input ref={node => {inputKind = node;}} />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Marca</label>
              <input ref={node => {inputBrand = node;}} />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Modelo</label>
                <input type='number' ref={node => {inputModel = node;}} />
              </Form.Field>
              <Form.Field>
                <label>Color</label>
                <input ref={node => {inputColor = node;}} />
              </Form.Field>
              <Form.Field>
                <label>Capacidad</label>
                <input type='number' ref={node => {inputCapacity = node;}} />
              </Form.Field>
              {/* <Form.Field>
                <label>Placa</label>
                <input ref={node => {inputPlate = node;}} />
              </Form.Field>
              <Form.Field>
              <label>Tipo</label>
              <input ref={node => {inputKind = node;}} />
            </Form.Field>
            <Form.Field>
            <label>Marca</label>
            <input ref={node => {inputBrand = node;}} />
          </Form.Field>
          <Form.Field>
          <label>Modelo</label>
          <input ref={node => {inputModel = node;}} />
        </Form.Field>
        <Form.Field>
        <label>Color</label>
        <input ref={node => {inputColor = node;}} />
      </Form.Field>
      <Form.Field>
      <label>Capacidad</label>
      <input ref={node => {inputCapacity = node;}} />
    </Form.Field> */}
            </Form.Group>
            <Button type='submit'>Crear Vehículo</Button>
          </Form>
          {error && <p>Hubo un error! Intenta de nuevo</p>}
        </div>
      )}
    </Mutation>
  );
};

const AddVehicle = () => (
  <div>
    <h1 className="ui centered header">Agregar Vehículo:</h1>
    <CreateVehicle/>
  </div>
);

export default AddVehicle;

/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import '../css/vehicleAndRoute.css';
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
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
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
                <input type="text" pattern="^([A-Za-z]{3}[-][0-9]{3})?([A-Za-z]{3}[-][0-9]{2}?[A-Za-z]{1})?$" ref={node => {inputPlate = node;}} style={{textTransform: "uppercase"}} placeholder="Ej: AAA-111, AAA-11A, ..." required />
              </Form.Field>
              <Form.Field>
                <label>Tipo</label>
                <select ref={node => {inputKind = node;}} style={{textTransform: "capitalize"}} placeholder="Carro o Moto" required>
                  <option value="Carro">Carro</option>
                  <option value="Moto">Moto</option>
                </select>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Marca</label>
                <input type="text" pattern="^([A-Za-z]+)?$" ref={node => {inputBrand = node;}} style={{textTransform: "capitalize"}} placeholder="Ej: Renault, Yamaha, ..." required/>
              </Form.Field>
              <Form.Field>
                <label>Modelo</label>
                <input type="number" size="4" min={currentYear - 50} max={currentYear + 1} ref={node => {inputModel = node;}} style={{textTransform: "capitalize"}} placeholder="Ej: 2010, 2015, ..." required/>
              </Form.Field>
            </Form.Group>            
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Color</label>
                <input type="text" pattern="^([A-Za-z]+)?$" ref={node => {inputColor = node;}} style={{textTransform: "capitalize"}} placeholder="Ej: Rojo, Azul, ..." required/>
              </Form.Field>
              <Form.Field>
                <label>Capacidad</label>
                <input type='number' min="1" ref={node => {inputCapacity = node;}} placeholder="Ej: 4, 2, ..." required/>
              </Form.Field>
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

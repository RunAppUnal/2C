/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import Map from './Map';
import '../css/bikeRoutes.css';

import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

var currUserId = localStorage.getItem('currUserId');




const AddBikeRoute = () => (
  <div>
    <Link exact to="/bikeRoutes"><Button color="teal">
      <i className="angle left icon"></i> Volver a Todas las rutas
    </Button></Link><br/><br/>
    <h2 className="section-heading"><i className="plus icon"></i> Nueva Ruta en Bici</h2>
    <h3 className="section-subheading">Crea tu propia ruta para encontrar otras similares</h3>

    {/* <CreateBikeRoute/> */}
    <Map initialPosition={{lat: 48.858603, lng: 2.294471}} />
  </div>
);




const CREATE_BIKE_ROUTE = gql`
  mutation createBikeRoute($vehicle: VehicleInput!) {
    createBikeRoute(vehicle: $vehicle){
      user_id
    }
  }
`;

const CreateBikeRoute = () => {
  let inputPlate, inputKind, inputModel, inputColor, inputCapacity, inputBrand;

  return (
    <Mutation mutation={CREATE_BIKE_ROUTE}>
      {(createBikeRoute, { loading, error, called }) => (
        <div>
          <Form loading={loading} onSubmit={e => {
              e.preventDefault();
              createBikeRoute({ variables: {
                bikeRoute: {
                  capacity: inputCapacity.value
                }
              } });
            }}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Capacidad</label>
                <input type='number' ref={node => {inputCapacity = node;}} />
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

export default AddBikeRoute;

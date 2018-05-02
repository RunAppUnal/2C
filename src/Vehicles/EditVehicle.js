import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import '../css/vehicleAndRoute.css';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link, Redirect } from "react-router-dom";

var currUserId = localStorage.getItem('currUserId');

const UPDATE_VEHICLE = gql`
  mutation updateVehicle($id: Int!, $vehicle: VehicleInput!) {
    updateVehicle(id: $id, vehicle: $vehicle){
      user_id
    }
  }
`;
const GET_INFO_VEHICLE = gql`
  	query vehicleById($vehicleid: Int!){
	    vehicleById(id: $vehicleid){
	    	user_id
			plate
		    kind
		    model
		    color
		    capacity
		    brand
	    }
  	}
`;

const EditVehicle = ({ match }) => {
  let inputPlate, inputKind, inputModel, inputColor, inputCapacity, inputBrand;
  return (
  	<Query query={GET_INFO_VEHICLE} variables={{ vehicleid: match.params.vehicleid }}>
	    {({ loading, error, data }) => {
			if (loading) return "CARGANDO INFORMACIÓN DEL VEHÍCULO...";
			if (error) return `Error! ${error.message}`;
			let plate = data.vehicleById.plate;
			let kind = data.vehicleById.kind;
			let model = data.vehicleById.model;
			let color = data.vehicleById.color;
			let capacity = data.vehicleById.capacity;
			let brand = data.vehicleById.brand;
			var isDriver = false;
        	if(data.vehicleById.user_id == currUserId) isDriver = true;
			return (
				<div>
            		{isDriver ? (
            			<Mutation mutation={UPDATE_VEHICLE}>
					      {(updateVehicle, { loading, error, called }) => (
					        <div>
					        	<h1 className="ui centered header">Actualizar vehículo: </h1>
					          	<Form loading={loading} onSubmit={e => {
					              	e.preventDefault();
					              	updateVehicle({ variables: {
						            	id: match.params.vehicleid,
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
						            }});
					            }}>
					            <Form.Group widths='equal'>
					            	<Form.Field>
					                	<label>Placa</label>
					                	<input ref={node => {inputPlate = node;}} defaultValue={plate} style={{textTransform: "uppercase"}} placeholder="Ej: AAA-111, AAA-11A, ..."/>
					              	</Form.Field>
					              	<Form.Field>
						                <label>Tipo</label>
					                	<input ref={node => {inputKind = node;}} defaultValue={kind} style={{textTransform: "capitalize"}} placeholder="Carro o Moto" />
					              	</Form.Field>
					            </Form.Group>
					            <Form.Field>
					            	<label>Marca</label>
					              	<input ref={node => {inputBrand = node;}} defaultValue={brand} style={{textTransform: "capitalize"}} placeholder="Ej: Renault, Yamaha, ..." />
					            </Form.Field>
					            <Form.Group widths='equal'>
					              	<Form.Field>
					                	<label>Modelo</label>
					                	<input type='number' ref={node => {inputModel = node;}} defaultValue={model} style={{textTransform: "capitalize"}} placeholder="Ej: 2010, 2015, ..." />
					              	</Form.Field>
					              	<Form.Field>
						                <label>Color</label>
						                <input ref={node => {inputColor = node;}} defaultValue={color} style={{textTransform: "capitalize"}} placeholder="Ej: Rojo, Azul, ..." />
					              	</Form.Field>
					              	<Form.Field>
						                <label>Capacidad</label>
						                <input type='number' ref={node => {inputCapacity = node;}} defaultValue={capacity} placeholder="Ej: 4, 2, ..." />
					              	</Form.Field>
					            </Form.Group>
					            <Button type='submit'>Actualizar vehículo</Button>
					        </Form>
					          {error && <p>Hubo un error! Intenta de nuevo</p>}
					        </div>
					      )}
					    </Mutation>
            		):(
            			<Redirect to={`/profile/my-vehicles`}/>
            		)}
            	</div>
			)
		}}
	</Query>	
  );
};

export default EditVehicle;

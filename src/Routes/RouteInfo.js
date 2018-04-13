import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import { withAuth } from "../auth";
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

var currUserId = localStorage.getItem('currUserId');

const GET_INFO_ROUTE = gql`
  	query routeById($routeid: Int!){
	    routeById(id: $routeid){
			title
	    	description
	    	cost
	    	departure
	    	user_id
	    	car_id
	    	spaces_available
	    }
  	}
`;
const GET_INFO_DRIVER = gql`
  	query userById($userid: Int!){
	    userById(userid: $userid){
			name
			lastname
			username
			email
	    }
  	}
`;
const GET_INFO_VEHICLE = gql`
  	query vehicleById($vehicleid: Int!){
	    vehicleById(id: $vehicleid){
			plate
		    kind
		    model
		    color
		    capacity
		    brand
	    }
  	}
`;
const RouteInfo = ({ match }) => {
	return (
	    <Query query={GET_INFO_ROUTE} variables={{ routeid: match.params.routeid }}>
	    	{({ loading, error, data }) => {
	        	if (loading) return "CARGANDO INFORMACIÓN DE LA RUTA...";
	        	if (error) return `Error! ${error.message}`;
	        	return (
	        		<div className= "container">
	        			<div className="row">
	        				<dl className="dl-horizontal">
	        					<h3>Información de la ruta</h3>
  								<dt>Título</dt>
							  	<dd>{data.routeById.title}</dd>
							  	<dt>Descripción</dt>
							  	<dd>{data.routeById.description}</dd>
							  	<dt>Costo</dt>
							  	<dd>{data.routeById.cost}</dd>
							  	<dt>Fecha</dt>
							  	<dd>{data.routeById.departure}</dd>
							  	<dt>Cupos</dt>
							  	<dd>{data.routeById.spaces_available}</dd>
							  	<dt>Vehículo</dt>
							  	<dd>{data.routeById.car_id}</dd>
							</dl>
							<Query query={GET_INFO_DRIVER} variables={{ userid: data.routeById.user_id }}>
	    						{({ loading, error, data }) => {
	        						if (loading) return "CARGANDO INFORMACIÓN DEL CONDUCTOR...";
	        						if (error) return `Error! ${error.message}`;
	        						return (
						       			<div class= "container">
						       				<div class="row">
						       					<dl class="dl-horizontal">
						       						<h3>Información del conductor</h3>
					  								<dt>Nombre</dt>
												  	<dd>{data.userById.name} {data.userById.lastname}</dd>
												  	<dt>Usuario</dt>
												  	<dd>{data.userById.username}</dd>
												  	<dt>Correo</dt>
												  	<dd>{data.userById.email}</dd>
												</dl>
							            	</div>
						       			</div>
	        						);
	      						}}
	    					</Query>
	    					<Query query={GET_INFO_VEHICLE} variables={{ vehicleid: data.routeById.car_id }}>
	    						{({ loading, error, data }) => {
	        						if (loading) return "CARGANDO INFORMACIÓN DEL VEHÍCULO...";
	        						if (error) return `Error! ${error.message}`;
	        						return (
						       			<div class= "container">
						       				<div class="row">
						       					<dl class="dl-horizontal">
						       						<h3>Información del vehículo</h3>
					  								<dt>Placa</dt>
												  	<dd>{data.vehicleById.plate}</dd>
												  	<dt>Tipo</dt>
												  	<dd>{data.vehicleById.kind}</dd>
												  	<dt>Marca</dt>
												  	<dd>{data.vehicleById.brand}</dd>
												  	<dt>Modelo</dt>
												  	<dd>{data.vehicleById.model}</dd>
												  	<dt>Color</dt>
												  	<dd>{data.vehicleById.color}</dd>
												  	<dt>Capacidad</dt>
												  	<dd>{data.vehicleById.capacity}</dd>
												</dl>
							            	</div>
						       			</div>
	        						);
	      						}}
	    					</Query>
			           	</div>
	          		</div>
	        	);
	      	}}
	    </Query>
	)
};

export default RouteInfo;
/* eslint-disable */
import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import '../css/bikeRoutes.css';
import registerServiceWorker from '../registerServiceWorker';
import { withAuth } from "../auth";
import { Map, geocode } from '../BikeRoutes/Map.js';
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import $ from 'jquery';

var currUserId = localStorage.getItem('currUserId');
function getMonth(monthNumber){
  if(monthNumber == '01') return 'Ene';
  if(monthNumber == '02') return 'Feb';
  if(monthNumber == '03') return 'Mar';
  if(monthNumber == '04') return 'Abr';
  if(monthNumber == '05') return 'May';
  if(monthNumber == '06') return 'Jun';
  if(monthNumber == '07') return 'Jul';
  if(monthNumber == '08') return 'Ago';
  if(monthNumber == '09') return 'Sep';
  if(monthNumber == '10') return 'Oct';
  if(monthNumber == '11') return 'Nov';
  if(monthNumber == '12') return 'Dic';
}

const GET_INFO_ROUTE = gql`
  	query routeById($routeid: Int!){
	    routeById(id: $routeid){
	    	id
			  title
	    	description
	    	cost
	    	departure
	    	user_id
	    	car_id
	    	spaces_available
	    	users_in_route
        from_lat
        from_lng
        to_lat
        to_lng
        waypoints
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
const ADD_USER_TO_ROUTE = gql`
  	mutation addUserFromRoute($routeid: Int!, $userid: Int!){
	    addUserFromRoute(id: $routeid, userid: $userid){
	    	users_in_route
	    }
  	}
`;
const REMOVE_USER_TO_ROUTE = gql`
  	mutation removeUserFromRoute($routeid: Int!, $userid: Int!){
	    removeUserFromRoute(id: $routeid, userid: $userid){
	    	users_in_route
	    }
  	}
`;
const GET_INFO_USER = gql`
  query userById($userid: Int!){
    userById(userid: $userid){
      name
      lastname
      username
      email
    }
  }
`;
const DELETE_ROUTE = gql`
  	mutation deleteRoute($routeid: Int!){
	    deleteRoute(id: $routeid){
	    	id
	    }
  	}
`;

const RouteInfo = ({ match }) => {
	return (
	    <Query query={GET_INFO_ROUTE} variables={{ routeid: match.params.routeid }}>
	    	{({ loading, error, data }) => {
	        	if (loading) return "CARGANDO INFORMACIÓN DE LA RUTA...";
	        	if (error) return `Error! ${error.message}`;
	        	var isUserInRoute = data.routeById.users_in_route.split(', ').includes(currUserId);
	        	var isSpacesFull = data.routeById.spaces_available == 0;
	        	var isDriver = false;
	        	if(data.routeById.user_id == currUserId) isDriver = true;
	        	var mailTo = '';
	        	var now = new Date();
        		now.setHours(now.getHours() - 5);
        		var today = now.toISOString();
	        	var numUsersInRoute = [];
	        	if(data.routeById.users_in_route.length != 0){
	        		numUsersInRoute = data.routeById.users_in_route.split(', ');
	        	}

	            let title = data.routeById.title;
	            let description = data.routeById.description;
	            let date = data.routeById.departure.substring(8,10) + " / " + getMonth(data.routeById.departure.substring(5,7)) + " / " + data.routeById.departure.substring(0,4);
	            let cost = "$" + data.routeById.cost;
	            let spaces = data.routeById.spaces_available;
	            let from = {lat: data.routeById.from_lat, lng: data.routeById.from_lng};
	            let to = {lat: data.routeById.to_lat, lng: data.routeById.to_lng};
	            let waypoints = JSON.parse(data.routeById.waypoints);

	        	return (
	        		<div className= "container">
	        					<h2 className="section-heading">
									<span className="underline"><i className="car icon"></i> Ruta de Carpool</span>
								</h2><br/>
						<div className="row">
		        			<div className="col-sm-8 col-md-8 col-lg-8">
				                <p className="content">
				                	<b>Título:</b> {title}
				                	<br /><br />
									<b>Descripción:</b> {description}
									<br /><br />
									<b>Estado:</b> 
									{today <= data.routeById.departure ? (
		                          		<svg height="20" width="25" title="Disponible">
		                            		<circle cx="12" cy="12" r="6" fill="#46f711">
		                              			<title>Disponible</title>
		                            		</circle>
		                          		</svg> 
                        			) : (
			                          	<svg height="20" width="25" title="Disponible">
			                            	<circle cx="12" cy="12" r="6" fill="red">
			                              		<title>No disponible</title>
			                            	</circle>
			                          	</svg> 
                        			)}
				                </p>
				                
							</div>
							{isDriver ? (
								<dl className="dl-horizontal col-sm-4 col-md-4 col-lg-4">
									< Mutation  mutation = { DELETE_ROUTE } variables = {{ routeid: data.routeById.id }} >
							        	{( addUserFromRoute , { loading , error , data }) => (
							            	<button onClick ={ addUserFromRoute } class="btn btn-outline-danger" id="addUserToRouteBtn"> Eliminar esta ruta</button>
							          	)}
						        	</ Mutation >
								</dl>
							) : (
								<div></div>
							)}
						</div>
                		<div className="create map">
		                	<div className="map info">
			                    <h5>Fecha de Salida:</h5>{date}<br/><br/>
			                    <h5>Costo:</h5>{cost}<br/><br/>
			                    <h5>Cupos:</h5>{spaces}
		                  	</div>
                  			<Map from={from} to={to} waypoints={waypoints} />
                			</div><br/><br/>
	        			<div className="row">
	        				<dl className="dl-horizontal col-sm-6 col-md-6 col-lg-6">
        					<h3>Usuarios en la ruta</h3>
							  	<dd>
							  		<div className="col-lg-12">
										<div className="main-box no-header clearfix">
		    								<div className="main-box-body clearfix">
		        								<div className="table-responsive">
		        									<table className="table user-list">
							                            <thead>
							                                <tr>
							                                <th><span>Pasajeros</span></th>
							                                </tr>
							                            </thead>
							                            <tbody>
							                            	{numUsersInRoute.map(user =>
							                            		<Query query={GET_INFO_USER} variables={{ userid: user }}>
										    						{({ loading, error, data }) => {
										        						if (loading) return "CARGANDO INFORMACIÓN DEL PASAJERO...";
										        						if (error) return `Error! ${error.message}`;
										        						mailTo = 'mailto:' + "" + data.userById.email;
										        						return (
								                            				<tr>
											                                    <td>
											                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""/>
													                                <a href="#" className="user-link">{data.userById.name} {data.userById.lastname}</a>
													                                <span className="user-subhead">{data.userById.username}</span>
													                                <span className="label label-default">{data.userById.email}</span>
													                                <a href={mailTo} className="table-link">
											                                            <span className="fa fa-envelope-square"> Enviar correo</span>
											                                        </a>
											                                    </td>
											                                </tr>
										        						);
										      						}}
										    					</Query>
							                                )}
							                            </tbody>
							                        </table>
		        								</div>
		        							</div>
		        						</div>
									</div>
							  	</dd>
							</dl>
							<Query query={GET_INFO_DRIVER} variables={{ userid: data.routeById.user_id }}>
	    						{({ loading, error, data }) => {
	        						if (loading) return "CARGANDO INFORMACIÓN DEL CONDUCTOR...";
	        						if (error) return `Error! ${error.message}`;
	        						mailTo = 'mailto:' + "" + data.userById.email;
	        						return (
						       			<div className= "container">
						       				<div className="row">
						       					<dl className="dl-horizontal col-sm-6 col-md-6 col-lg-6">
						       						<h3>Información del conductor</h3>
												  	<dd>
														<div className="col-lg-12">
															<div className="main-box no-header clearfix">
							    								<div className="main-box-body clearfix">
							        								<div className="table-responsive">
							        									<table className="table user-list">
												                            <thead>
												                                <tr>
												                                <th><span>Conductor</span></th>
												                                </tr>
												                            </thead>
												                            <tbody>
								                            					<tr>
												                                    <td>
												                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""/>
														                                <a href="#" className="user-link">{data.userById.name} {data.userById.lastname}</a>
														                                <span className="user-subhead">{data.userById.username}</span>
														                                <span className="label label-default">{data.userById.email}</span>
														                                <a href={mailTo} className="table-link">
												                                            <span className="fa fa-envelope-square"> Enviar correo</span>
												                                        </a>
												                                    </td>
												                                </tr>
												                            </tbody>
												                        </table>
							        								</div>
							        							</div>
							        						</div>
														</div>
												  	</dd>
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
						       			<div className= "container">
						       				<div className="row">
						       					<dl className="dl-horizontal">
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
			           	{today <= data.routeById.departure ? 
			           		(isDriver ? (
			           			<div></div>
							) : (isUserInRoute ? (
									< Mutation  mutation = { REMOVE_USER_TO_ROUTE } variables = {{ routeid: data.routeById.id, userid: currUserId }} >
			          					{( removeUserFromRoute , { loading , error , data }) => (
			             					<button onClick ={ removeUserFromRoute } className="btn btn-outline-danger" id="removeUserToRouteBtn"> Salirme de la ruta </button>
			          					)}
			        				</ Mutation >
				           		) : (isSpacesFull ? (
										<button className="btn" disabled> Cupos completos </button>
					           		) : (
										< Mutation  mutation = { ADD_USER_TO_ROUTE } variables = {{ routeid: data.routeById.id, userid: currUserId }} >
				          					{( addUserFromRoute , { loading , error , data }) => (
				             					<button onClick ={ addUserFromRoute } className="btn btn-outline-success" id="addUserToRouteBtn"> Unirme a la ruta </button>
				          					)}
			        					</ Mutation >
				           			)
				           		)
							)
			           	) : (
							<div>Esta ruta ha finalizado.</div>
			           	)}
	          		</div>
	        	);
	      	}}
	    </Query>
	)
};

$(document).ready(function(){
	$('#addUserToRouteBtn').click(function(){
		window.location.reload(true);
	});
	$('#removeUserToRouteBtn').click(function(){
		window.location.reload(true);
	});
});


export default RouteInfo;

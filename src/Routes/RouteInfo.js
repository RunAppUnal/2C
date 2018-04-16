/* eslint-disable */
import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import { withAuth } from "../auth";
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
	        	var numUsersInRoute = [];
	        	var mailTo = '';
	        	if(data.routeById.users_in_route.length != 0){
	        		numUsersInRoute = data.routeById.users_in_route.split(', ');
	        	}
	        	return (
	        		<div className= "container">
	        			<div className="row">
	        				<dl className="dl-horizontal col-sm-6 col-md-6 col-lg-6">
	        					<h3>Información de la ruta</h3>
  								<dt>Título</dt>
							  	<dd>{data.routeById.title}</dd>
							  	<dt>Descripción</dt>
							  	<dd>{data.routeById.description}</dd>
							  	<dt>Costo</dt>
							  	<dd>{data.routeById.cost}</dd>
							  	<dt>Fecha de salida</dt>
							  	<dd>{data.routeById.departure.substring(8,10) + " / " + getMonth(data.routeById.departure.substring(5,7)) + " / " + data.routeById.departure.substring(0,4)}</dd>
							  	<dt>Cupos disponibles</dt>
							  	<dd>{data.routeById.spaces_available}</dd>
							  	<dt>Usuarios en la ruta</dt>
							  	<dd>
							  		<div class="col-lg-12">
										<div class="main-box no-header clearfix">
		    								<div class="main-box-body clearfix">
		        								<div class="table-responsive">
		        									<table class="table user-list">
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
													                                <a href="#" class="user-link">{data.userById.name} {data.userById.lastname}</a>
													                                <span class="user-subhead">{data.userById.username}</span>
													                                <span class="label label-default">{data.userById.email}</span>
													                                <a href={mailTo} class="table-link">
											                                            <span class="fa fa-envelope-square"> Enviar correo</span>
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
						       			<div class= "container">
						       				<div class="row">
						       					<dl class="dl-horizontal col-sm-6 col-md-6 col-lg-6">
						       						<h3>Información del conductor</h3>
												  	<dd>
														<div class="col-lg-12">
															<div class="main-box no-header clearfix">
							    								<div class="main-box-body clearfix">
							        								<div class="table-responsive">
							        									<table class="table user-list">
												                            <thead>
												                                <tr>
												                                <th><span>Conductor</span></th>
												                                </tr>
												                            </thead>
												                            <tbody>
								                            					<tr>
												                                    <td>
												                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""/>
														                                <a href="#" class="user-link">{data.userById.name} {data.userById.lastname}</a>
														                                <span class="user-subhead">{data.userById.username}</span>
														                                <span class="label label-default">{data.userById.email}</span>
														                                <a href={mailTo} class="table-link">
												                                            <span class="fa fa-envelope-square"> Enviar correo</span>
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


                  <div class="container">
                      <div class="row">
                          <div class="col-xs-12 col-md-6">
                            <h3>Calificaciones</h3><br></br>
                            <div class="well well-sm">
                                <div class="row">
                                  <div class="col-xs-12 col-md-6 text-center">
                                    <h1 class="rating-num">4<span style={{fontSize: 28 + 'px'}}>/5</span></h1>
                                    <div class="rating">
                                        <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star">
                                        </span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star">
                                        </span><span class="glyphicon glyphicon-star-empty"></span>
                                    </div>
                                    <div>
                                        <span class="glyphicon glyphicon-user"></span>1,050,008 total
                                    </div>
                                  </div>
                                  <div class="col-xs-12 col-md-6">
                                      <div class="row rating-desc">
                                        <div class="col-xs-3 col-md-3 text-right">
                                          <span class="glyphicon glyphicon-star"></span>5
                                        </div>
                                        <div class="col-xs-8 col-md-9">
                                          <div class="progress progress-striped">
                                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                                                aria-valuemin="0" aria-valuemax="100" style={{width: 80 + '%'}}>
                                                <span class="sr-only">80%</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3 text-right">
                                          <span class="glyphicon glyphicon-star"></span>4
                                        </div>
                                        <div class="col-xs-8 col-md-9">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                                                    aria-valuemin="0" aria-valuemax="100" style={{width: 60 + '%'}}>
                                                    <span class="sr-only">60%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3 text-right">
                                          <span class="glyphicon glyphicon-star"></span>3
                                        </div>
                                        <div class="col-xs-8 col-md-9">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20"
                                                    aria-valuemin="0" aria-valuemax="100" style={{width: 40 + '%'}}>
                                                    <span class="sr-only">40%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3 text-right">
                                            <span class="glyphicon glyphicon-star"></span>2
                                        </div>
                                        <div class="col-xs-8 col-md-9">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="20"
                                                    aria-valuemin="0" aria-valuemax="100" style={{width: 20 + '%'}}>
                                                    <span class="sr-only">20%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3 text-right">
                                            <span class="glyphicon glyphicon-star"></span>1
                                        </div>
                                        <div class="col-xs-8 col-md-9">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80"
                                                    aria-valuemin="0" aria-valuemax="100" style={{width: 15 + '%'}}>
                                                    <span class="sr-only">15%</span>
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>

























						{isDriver ? (
							<div></div>
						) : (isUserInRoute ? (
								< Mutation  mutation = { REMOVE_USER_TO_ROUTE } variables = {{ routeid: data.routeById.id, userid: currUserId }} >
		          					{( removeUserFromRoute , { loading , error , data }) => (
		             					<button onClick ={ removeUserFromRoute } class="btn btn-outline-danger" id="removeUserToRouteBtn"> Salirme de la ruta </button>
		          					)}
		        				</ Mutation >
			           		) : (isSpacesFull ? (
									<button class="btn" disabled> Cupos completos </button>
				           		) : (
									< Mutation  mutation = { ADD_USER_TO_ROUTE } variables = {{ routeid: data.routeById.id, userid: currUserId }} >
			          					{( addUserFromRoute , { loading , error , data }) => (
			             					<button onClick ={ addUserFromRoute } class="btn btn-outline-success" id="addUserToRouteBtn"> Unirme a la ruta </button>
			          					)}
		        					</ Mutation >
			           			)
			           		)
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

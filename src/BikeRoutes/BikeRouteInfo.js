/* eslint-disable */
import React, { Component } from 'react';
import '../css/bikeRoutes.css';
import { Button } from 'semantic-ui-react'
import { Route, NavLink, BrowserRouter as Router } from "react-router-dom";
import { Map, geocode } from './Map.js';

import { GetUser } from '../Queries/GetUser';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import $ from 'jquery';

var currUserId = localStorage.getItem('currUserId');
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2[1] - p1[1]);
  var dLong = rad(p2[0] - p1[0]);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1[1])) * Math.cos(rad(p2[1])) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d/1000; // returns the distance in km
};

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
  	query bikeRoutesById($routeid: ID!){
	    bikeRoutesById(id: $routeid){
	    	id
	    	user_id
    		time
		    similar_routes {
		      id
		    }
		    origin
		    destination
		    originAddr
		    destinationAddr
		    route_points {
		      type
		    }
		    route_distance
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
const DELETE_ROUTE = gql`
  	mutation deleteBikeRoute($routeid: ID!){
	    deleteBikeRoute(id: $routeid){
	    	id
	    }
  	}
`;


const BikeRouteInfo = ({ match }) => {
	var matchParam = match.params.routeid;
	return (
	    <Query query={GET_INFO_ROUTE} variables={{ routeid: match.params.routeid }}>
	    	{({ loading, error, data }) => {
	        	if (loading) return "CARGANDO INFORMACIÓN DE LA RUTA...";
	        	if (error) return `Error! ${error.message}`;
	        	var isDriver = false;
	        	var now = new Date();
        		now.setHours(now.getHours() - 5);
        		var today = now.toISOString();
	        	if(data.bikeRoutesById.user_id == currUserId) isDriver = true;

				let userid = data.bikeRoutesById.user_id;
				let from = {lat: data.bikeRoutesById.origin[1], lng: data.bikeRoutesById.origin[0]};
				let to = {lat: data.bikeRoutesById.destination[1], lng: data.bikeRoutesById.destination[0]};
				let date = data.bikeRoutesById.time.substring(8,10) + " / " + getMonth(data.bikeRoutesById.time.substring(5,7)) + " / " + data.bikeRoutesById.time.substring(0,4);
				let distance = getDistance(data.bikeRoutesById.origin, data.bikeRoutesById.destination).toFixed(1)
				let waypoints = [];

			    for(let i = 0; i < data.bikeRoutesById.route_points.length; i++) {
			      waypoints.push({
			        location: {lat: data.bikeRoutesById.route_points[i][1], lng: data.bikeRoutesById.route_points[i][0]},
			        stopover: true
			      });
			    }

				let originAddr = data.bikeRoutesById.originAddr;
				let destinationAddr = data.bikeRoutesById.destinationAddr;

	        	return (
	        		<div className="container">
	        		{console.log(data.bikeRoutesById.destination)}
					<h2 className="section-heading">
						<span className="underline"><i className="bicycle icon"></i> Ruta en Bici</span>
					</h2><br/><br/>
					<center>
						<h5>Creado por:</h5>{<GetUser userId={userid} />}
					</center><br/><br/>
					<div className="row">
	        			<div className="col-sm-8 col-md-8 col-lg-8">

	        				<p className="content">
				                	<h5><b>Desde <i className="green point icon"> </i></b> {originAddr}</h5>
				                	<h5><b>Hacia <i className="red point icon"></i> </b> {destinationAddr}</h5>
									<h5><b>Estado:</b>
										{today <= data.bikeRoutesById.time ? (
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
		                    		</h5>
				                </p>     

						</div>
						{isDriver ? (
							today <= data.bikeRoutesById.time ? (
								<dl className="dl-horizontal col-sm-4 col-md-4 col-lg-4">
									<a href={`/bikeRoutes/${data.bikeRoutesById.id}/edit`}><button class="btn btn-outline-primary" id="addUserToRouteBtn"> Editar esta ruta</button></a>
									<br /><br />
									< Mutation  mutation = { DELETE_ROUTE } variables = {{ routeid: matchParam }} >
							        	{( deleteBikeRoute , { loading , error , data }) => (
							            	<button onClick ={ deleteBikeRoute } class="btn btn-outline-danger" id="addUserToRouteBtn"> Eliminar esta ruta</button>
							          	)}
						        	</ Mutation >					        	
								</dl>
							) : (
								<h5>Esta ruta ha finalizado.</h5>
							)
						) : (
							<div></div>
						)}
					</div>
					<div className="create map">
						<div className="map info">
							<h5>Fecha:</h5>{date}<br/><br/>
							<h5>Hora:</h5>{data.bikeRoutesById.time.substring(11, 16)}<br/><br/>
							<h5>Distancia:</h5>{`${distance} km`}
						</div>

						<Map from={from} to={to} waypoints={waypoints} />
					</div>
	          	</div>
	        	);
	      	}}
	    </Query>
	)
};

export default BikeRouteInfo;

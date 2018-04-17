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

const BikeRouteInfo = ({ match }) => {
	return (
	    <Query query={GET_INFO_ROUTE} variables={{ routeid: match.params.routeid }}>
	    	{({ loading, error, data }) => {
	        	if (loading) return "CARGANDO INFORMACIÓN DE LA RUTA...";
	        	if (error) return `Error! ${error.message}`;

						let userid = data.bikeRoutesById.user_id;
						let from = {lat: data.bikeRoutesById.origin[1], lng: data.bikeRoutesById.origin[0]};
						let to = {lat: data.bikeRoutesById.destination[1], lng: data.bikeRoutesById.destination[0]};
						let date = data.bikeRoutesById.time.substring(8,10) + " / " + getMonth(data.bikeRoutesById.time.substring(5,7)) + " / " + data.bikeRoutesById.time.substring(0,4);
						let distance = parseInt(data.bikeRoutesById.route_distance / 100) / 10;
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
								<h2 className="section-heading">
									<span className="underline"><i className="bicycle icon"></i> Ruta en Bici</span>
								</h2><br/><br/>

								<center>
									<h5>Creado por:</h5>{<GetUser userId={userid} />}
								</center><br/><br/>

								<h3>
									Desde <i className="green point icon"></i>
									{originAddr}
								</h3>

								<h3>
									Hacia <i className="red point icon"></i>
									{destinationAddr}
								</h3><br/>

								<div className="create map">
									<div className="map info">
										<h5>Fecha de Salida:</h5>{date}<br/><br/>
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

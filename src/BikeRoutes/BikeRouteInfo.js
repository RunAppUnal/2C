/* eslint-disable */
import React, { Component } from 'react';
import '../css/bikeRoutes.css';
import registerServiceWorker from '../registerServiceWorker';
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
  	query bikeRoutesById($routeid: ID!){
	    bikeRoutesById(id: $routeid){
	    	user_id
    		time
		    similar_routes {
		      id
		    }
		    origin
		    destination
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
	        	return (
	        		<div className= "container">
	        			<div className="row">
	        				<dl className="dl-horizontal col-sm-6 col-md-6 col-lg-6">
	        					<h3>Información de la ruta</h3>
  								<dt>Origen</dt>
							  	<dd>{data.bikeRoutesById.origin[0]} - {data.bikeRoutesById.origin[1]}</dd>
							  	<dt>Destino</dt>
							  	<dd>{data.bikeRoutesById.destination[0]} - {data.bikeRoutesById.destination[1]}</dd>
							  	<dt>Fecha</dt>
							  	<dd>{data.bikeRoutesById.time.substring(8,10) + " / " + getMonth(data.bikeRoutesById.time.substring(5,7)) + " / " + data.bikeRoutesById.time.substring(0,4)}</dd>
							</dl>
						</div>
	          		</div>
	        	);
	      	}}
	    </Query>
	)
};

export default BikeRouteInfo;

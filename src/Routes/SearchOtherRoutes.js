/* eslint-disable */
import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import { withAuth } from "../auth";

import { Query } from "react-apollo";
import gql from "graphql-tag";

var currUserId = localStorage.getItem('currUserId');

const GET_OTHER_ROUTES = gql`
	query searchOtherRoutes($userid: Int!, $word: String!, $cost: String!, $spaces: String!, $date: String!){
  		searchOtherRoutes(userid: $userid, word: $word, cost:$cost, spaces: $spaces, date: $date){
		    title
		    description
		    departure
		    cost
		    users_in_route
  		}
  	}
`;

const Other_Routes = (data) => {
  return (
    <Query query={GET_OTHER_ROUTES} variables={{ userid: data.userid, word: data.word, cost: data.cost, spaces: data.spaces, date: data.date }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO OTRAS RUTAS...";
        if (error) return '';//`Error! ${error.message}`;
        return (
        	<table>
        		<thead>
                	<tr>
	                	<th><b>Título</b></th>
	                  	<th><b>Descripción</b></th>
	                  	<th><b>Fecha</b></th>
	                  	<th><b>Precio</b></th>
	                  	<th><b>Pasajeros</b></th>
                	</tr>
              	</thead>
              	<tbody>
              		{data.searchOtherRoutes.map(route =>
                		<tr>
		                  	<td>{route.title}</td>
		                    <td>{route.description}</td>
		                    <td>{route.departure}</td>
		                    <td>{route.cost}</td>
		                    <td>{route.users_in_route}</td>
                		</tr>
              		)}
              	</tbody>
            </table>
        );
      }}
    </Query>
  )
};

var word = '';
var cost = '';
var space = '';
var date = '';

class SearchOtherRoutes extends Component {
	constructor(props) {
		super(props);
    	this.state = { word: '', cost: '', space: '', date: '' } ;
    	this.handleChangeWord = this.handleChangeWord.bind(this);
    	this.handleChangeCost = this.handleChangeCost.bind(this);
    	this.handleChangeSpace = this.handleChangeSpace.bind(this);
    	this.handleChangeDate = this.handleChangeDate.bind(this);
  	}
  	handleChangeWord(event) {
    	this.setState({ word: event.currentTarget.value });
  	}
  	handleChangeCost(event) {
    	this.setState({ cost: event.currentTarget.value });
  	}
  	handleChangeSpace(event) {
    	this.setState({ space: event.currentTarget.value });
  	}
  	handleChangeDate(event) {
    	this.setState({ date: event.currentTarget.value });
  	}
  	render() {
    	return (
      		<div>
      			<input type="text" class="form-control" onChange={ this.handleChangeWord } placeholder="Palabra clave (Ej. Fontibón, Universidad...)" />
      			<input type="number" min="100" step="100" class="form-control" onChange={ this.handleChangeCost } placeholder="Costo (Ej. 2000, 1500...)" />
      			<input type="number" min="1" step="1" class="form-control" onChange={ this.handleChangeSpace } placeholder="Cupos (Ej. 3, 4...)" />
      			<input type="date" class="form-control" onChange={ this.handleChangeDate } placeholder="Fecha" />
        		<Other_Routes userid={currUserId} word={ this.state.word } cost={ this.state.cost } spaces={ this.state.space } date={ this.state.date } />
      		</div>
    	);
  	}
}

export default SearchOtherRoutes;

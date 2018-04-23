/* eslint-disable */
import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import { withAuth } from "../auth";
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

const GET_OTHER_ROUTES = gql`
	query searchOtherRoutes($userid: Int!, $word: String!, $cost: String!, $spaces: String!, $date: String!){
  		searchOtherRoutes(userid: $userid, word: $word, cost:$cost, spaces: $spaces, date: $date){
		    id
        title
        description
        departure
        cost
        users_in_route
        spaces_available
  		}
  	}
`;

const Other_Routes = (data) => {
  return (
    <Query query={GET_OTHER_ROUTES} variables={{ userid: data.userid, word: data.word, cost: data.cost, spaces: data.spaces, date: data.date }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO OTRAS RUTAS...";
        if (error) return '';//`Error! ${error.message}`;
        var now = new Date();
        now.setHours(now.getHours() - 5);
        var today = now.toISOString();
        return (
        	<Router>
            <div class="row" id="otherRoutesCards">
              {data.searchOtherRoutes.map(route =>
                <div class="col-xs-12 col-sm-offset-6 col-sm-6">
                  <ul class="event-list">
                    <li>
                      <time>
                        <span class="day">{route.departure.substring(8, 10)}</span>
                        <span class="month">{getMonth(route.departure.substring(5, 7))}</span>
                        <span class="year">{route.departure.substring(0, 4)}</span>
                        <span class="time">ALL DAY</span>
                      </time>
                      <div class="info">
                        <h2 class="title"><NavLink to={`/route/${route.id}`} onClick={() => window.location.reload()}>{route.title}</NavLink></h2>
                        <p class="desc">{route.description}</p>
                        <ul class="infoUL">
                          <li><span class="fa fa-users"> {route.spaces_available}</span></li>
                          <li><span class="fa fa-dollar"> {route.cost}</span></li>
                        </ul>
                      </div>
                      <div class="social">
                        {today <= route.departure ? (
                          <svg height="30" width="30" title="Disponible">
                            <circle cx="12" cy="12" r="6" fill="#46f711">
                              <title>Disponible</title>
                            </circle>
                          </svg> 
                        ) : (
                          <svg height="30" width="30" title="Disponible">
                            <circle cx="12" cy="12" r="6" fill="red">
                              <title>No disponible</title>
                            </circle>
                          </svg> 
                        )}
                      </div>
                    </li>
                  </ul> 
                </div>
              )}
            </div>
          </Router>
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
          <div class="row">
            <div class="col-sm-12 col-md-6- col-lg-6 active-pink-3 active-pink-4 mb-4">
              <input type="text" class="form-control" onChange={ this.handleChangeWord } placeholder="Palabra clave (Ej. Fontibón, Universidad...)" aria-label="Search" />
            </div>
            <div class="col-sm-12 col-md-6- col-lg-6 active-purple-3 active-purple-4 mb-4">
              <input type="number" min="100" step="100" class="form-control" onChange={ this.handleChangeCost } placeholder="Costo (Ej. 2000, 1500...)" aria-label="Search" />
            </div>
            <div class="col-sm-12 col-md-6- col-lg-6 active-cyan-3 active-cyan-4 mb-4">
              <input type="number" min="1" step="1" class="form-control" onChange={ this.handleChangeSpace } placeholder="Cupos (Ej. 3, 4...)" aria-label="Search" />
            </div>
            <div class="col-sm-12 col-md-6- col-lg-6 active-cyan-3 active-cyan-4 mb-4">
              <input type="date" class="form-control" onChange={ this.handleChangeDate } placeholder="Fecha" aria-label="Search" />
            </div>
          </div>
          <hr/>
      		<Other_Routes userid={currUserId} word={ this.state.word } cost={ this.state.cost } spaces={ this.state.space } date={ this.state.date } />
      	</div>
    	);
  	}
}

export default SearchOtherRoutes;

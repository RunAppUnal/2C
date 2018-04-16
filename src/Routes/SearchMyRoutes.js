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

const GET_MY_ROUTES = gql`
  query searchMyRoutes($userid: Int!, $word: String!, $cost: String!, $spaces: String!, $date: String!){
  		searchMyRoutes(userid: $userid, word: $word, cost:$cost, spaces: $spaces, date: $date){
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

const My_Routes = (data) => {
  return (
    <Query query={GET_MY_ROUTES} variables={{ userid: data.userid, word: data.word, cost: data.cost, spaces: data.spaces, date: data.date }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO TUS RUTAS...";
        if (error) return '';//`Error! ${error.message}`;
        return (
          <Router>
            <div class="row" id="otherRoutesCards">
              {data.searchMyRoutes.map(route =>
                <div class="col-xs-12 col-sm-offset-12 col-sm-12">
                  <ul class="event-list">
                    <li>
                      <time datetime="2014-07-20">
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

class SearchMyRoutes extends Component {
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
        		<My_Routes userid={currUserId} word={ this.state.word } cost={ this.state.cost } spaces={ this.state.space } date={ this.state.date } />
      		</div>
    	);
  	}
}

export default SearchMyRoutes;

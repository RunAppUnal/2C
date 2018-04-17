/* eslint-disable */
import React, { Component } from 'react';
import '../css/myInfo.css';
import { withAuth } from "../auth";
import registerServiceWorker from '../registerServiceWorker';
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
  query otherRoutes($userid: Int!){
    otherRoutes(userid: $userid){
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

const Other_Routes = withAuth(({ auth }) => {
  return (
    <Query query={GET_OTHER_ROUTES} variables={{ userid: currUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO OTRAS RUTAS...";
        if (error) return `Error! ${error.message}`;
        return (
          <Router>
            <div class="row" id="otherRoutesCards">
              {data.otherRoutes.map(route =>
                <div class="col-xs-6 col-sm-offset-6 col-sm-6">
                  {route.users_in_route.split(', ').includes(currUserId) ? (
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
                        <div class="social"></div>
                      </li>
                    </ul>) : (
                    <div></div>
                  )}                  
                </div>
              )}
            </div>
          </Router>
        );
      }}
    </Query>
  )
});

class RoutesJoined extends Component {
  render() {
    return (
      <div>
        <Other_Routes/>        
      </div>
    );
  }
}

export default RoutesJoined;
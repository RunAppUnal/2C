/* eslint-disable */
import React, { Component } from 'react';
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import RouteInfo from './RouteInfo'
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
  query myRoutes($userid: Int!){
    myRoutes(userid: $userid){
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

const My_Routes = withAuth(({ auth }) => {
  return(
    <Query query={GET_MY_ROUTES} variables={{ userid: currUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "CARGANDO TUS RUTAS...";
        if (error) return `Error! ${error.message}`;
        var now = new Date();
        now.setHours(now.getHours() - 5);
        var today = now.toISOString();
        return (
          <Router>
            <div class="row" id="otherRoutesCards">
              {data.myRoutes.length > 0 ? (
                data.myRoutes.map(route =>
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
                )
              ):(
                <p>No hay rutas para mostrar.</p>
              )}              
            </div>
          </Router>
        );
      }}
    </Query>
  )
});

const Routes = () => (
  <My_Routes/>
);

class MyRoutes extends Component {
  render() {
    return (
      <div>
          <Routes />
      </div>
    );
  }
}

export default MyRoutes;

/* eslint-disable */
import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import '../css/vehicleAndRoute.css';
import registerServiceWorker from '../registerServiceWorker';
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import AddVehicle from './AddVehicle'
import ShowMyVehicles from './ShowMyVehicles'

import { Query } from "react-apollo";
import gql from "graphql-tag";


class MyVehicles extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4"></div>

            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6" id="vehiclesNav">
                  <NavLink exact to="/profile/my-vehicles" className="nav-link">Ver mis vehículos</NavLink>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6" id="vehiclesNav">
                  <NavLink exact to="/profile/my-vehicles/new" className="nav-link">Agregar un vehículo</NavLink>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-md-4 col-lg-4"></div>
          </div>
          <div className="content">
            <Route exact path="/profile/my-vehicles" component={ShowMyVehicles}/>
            <Route path="/profile/my-vehicles/new" component={AddVehicle}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default MyVehicles;

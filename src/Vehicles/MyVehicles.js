import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import '../css/myVehicle.css';
import registerServiceWorker from '../registerServiceWorker';
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import AddVehicle from './AddVehicle'
import ShowMyVehicles from './ShowMyVehicles'

import { Query } from "react-apollo";
import gql from "graphql-tag";


class MyVehicles extends Component {
  render() {
    return (
      <Router>
        <div>
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4"></div>

            <div class="col-sm-4 col-md-4 col-lg-4">
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6" id="vehiclesNav">
                  <Link exact to="/profile/my-vehicles" class="nav-link">Ver mis vehículos</Link>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6" id="vehiclesNav">
                  <Link exact to="/profile/my-vehicles/new" class="nav-link">Agregar un vehículo</Link>
                </div>
              </div>    
            </div>

            <div class="col-sm-4 col-md-4 col-lg-4"></div>
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

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
          <ul className="header">
            <li><Link exact to="/profile/my-vehicles">Ver mis vehículos</Link></li>
            <li><Link to="/profile/my-vehicles/new">Agregar un vehículo</Link></li>
          </ul>
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

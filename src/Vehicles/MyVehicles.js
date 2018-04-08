import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import '../css/myVehicle.css';
import registerServiceWorker from '../registerServiceWorker';
import {Route, NavLink, HashRouter} from "react-router-dom";
import AddVehicle from './AddVehicle'
import ShowMyVehicles from './ShowMyVehicles'

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

class MyVehicles extends Component {
  render() {
    return (

      <HashRouter>
        <div>
          <ul className="header">
            <li><NavLink exact to="/profile/my-vehicles">Ver mis vehículos</NavLink></li>
            <li><NavLink to="/profile/my-vehicles/new">Agregar un vehículo</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/profile/my-vehicles" component={ShowMyVehicles}/>
            <Route path="/profile/my-vehicles/new" component={AddVehicle}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default MyVehicles;
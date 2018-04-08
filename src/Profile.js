import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import './css/profile.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, NavLink, HashRouter} from "react-router-dom";
import MyInfo from './MyInfo'
import MyVehicles from './MyVehicles'
import MyRoutes from './MyRoutes'
import AddVehicle from './AddVehicle'

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

class Profile extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Perfil del ususario.</h1>
          <ul className="header">
            <li><NavLink exact to="/profile">Mi información</NavLink></li>
            <li><NavLink to="/profile/my-vehicles">Mis vehículos</NavLink></li>
            <li><NavLink to="/profile/my-routes">Mis rutas</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/profile" component={MyInfo}/>
            <Route path="/profile/my-vehicles" component={MyVehicles}/>
            <Route path="/profile/my-routes" component={MyRoutes}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Profile;
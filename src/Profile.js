/* eslint-disable */
import React, { Component } from 'react';
import './css/profile.css';
import registerServiceWorker from './registerServiceWorker';
import { Route, NavLink, Redirect, BrowserRouter as Router } from "react-router-dom";
import { withAuth } from "./auth";
import MyInfo from './MyInfo/MyInfo'
import RoutesJoined from './MyInfo/RoutesJoined'
import MyVehicles from './Vehicles/MyVehicles'
import AddVehicle from './Vehicles/AddVehicle'
import EditVehicle from './Vehicles/EditVehicle';

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const Profile = withAuth(({ auth }) => {
    return (
      <Router>
      <div>
        <ul className="header">
          <li><NavLink exact to="/profile">Mi información</NavLink></li>
          <li><NavLink to="/profile/my-vehicles">Mis vehículos</NavLink></li>
          <li><NavLink to="/profile/routes-joined">Rutas a las que me he unido</NavLink></li>
        </ul>
        <div className="content">
          <Route exact path="/profile" component={MyInfo}/>
          <Route exact path="/profile/my-vehicles" component={MyVehicles}/>
          <Route exact path="/profile/my-vehicles/:vehicleid/edit" component={EditVehicle}/>
          <Route path="/profile/routes-joined" component={RoutesJoined}/>
        </div>
      </div>
      </Router>
    )
});

export default Profile;

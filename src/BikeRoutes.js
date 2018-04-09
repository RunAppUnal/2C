import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import './css/profile.css';
import registerServiceWorker from './registerServiceWorker';
import { Route, NavLink, Redirect, BrowserRouter as Router } from "react-router-dom";
import { withAuth } from "./auth";
import OtherBikeRoutes from './BikeRoutes/OtherBikeRoutes'

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const BikeRoutes = withAuth(({ auth }) => {
    return (
      <Router>
      <div>
        <h1>Rutas de otros usuarios.</h1>
        <div className="content">
          <Route exact path="/bikeRoutes" component={OtherBikeRoutes}/>
        </div>
      </div>
      </Router>
    )
});

export default BikeRoutes;

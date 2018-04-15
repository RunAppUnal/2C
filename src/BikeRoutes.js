/* eslint-disable */
import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import './css/profile.css';
import registerServiceWorker from './registerServiceWorker';
import { Route, Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import { withAuth } from "./auth";
import OtherBikeRoutes from './BikeRoutes/OtherBikeRoutes'
import AddBikeRoute from './BikeRoutes/AddBikeRoute'

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const BikeRoutes = withAuth(({ auth }) => {
    return (
      <Router>
      <div>
        <div className="content">
          <Route exact path="/bikeRoutes/" component={OtherBikeRoutes}/>
          <Route exact path="/bikeRoutes/new" component={AddBikeRoute}/>
        </div>
      </div>
      </Router>
    )
});

export default BikeRoutes;

/* eslint-disable */
import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import './css/bikeRoutes.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import { withAuth } from "./auth";
import OtherBikeRoutes from './BikeRoutes/OtherBikeRoutes';
import MyBikeRoutes from './BikeRoutes/MyBikeRoutes';
import AddBikeRoute from './BikeRoutes/AddBikeRoute';

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const BikeRoutes = withAuth(({ auth }) => {
    return (
      <Router>
        <div>
          <div className="content">
            <Route exact path="/bikeRoutes" component={OtherBikeRoutes}/>
            <Route exact path="/my-bikeRoutes" component={MyBikeRoutes}/>
          </div>
        </div>
      </Router>
    )
});

export default BikeRoutes;

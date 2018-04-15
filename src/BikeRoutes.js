/* eslint-disable */
import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import './css/bikeRoutes.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import { withAuth } from "./auth";
import OtherBikeRoutes from './BikeRoutes/OtherBikeRoutes'
import MyBikeRoutes from './BikeRoutes/MyBikeRoutes'
import AddBikeRoute from './BikeRoutes/AddBikeRoute'

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const BikeRoutes = withAuth(({ auth }) => {
    return (
      <Router>
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h2 className="section-heading"><i className="bicycle icon"></i> Rutas en Bici</h2>
              <h3 className="section-subheading">Encuentra una ruta que se parezca a la tuya</h3>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2"></div>

            <div className="col-sm-8 col-md-8 col-lg-8">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <Link exact="true" to="/bikeRoutes/" className="nav-link"><i className="fa fa-eye"></i> Rutas de otros usuarios</Link>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <Link exact="true" to="/bikeRoutes/my-routes" className="nav-link"><i className="fa fa-search"></i> Mis rutas</Link>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <Link exact="true" to="/bikeRoutes/new" className="nav-link"><i className="fa fa-plus"></i> Crear ruta</Link>
                </div>
              </div>
            </div>

            <div className="col-sm-2 col-md-2 col-lg-2"></div>
          </div>
          <div>
            <div className="content">
              <Route exact path="/bikeRoutes/" component={OtherBikeRoutes}/>
              <Route exact path="/bikeRoutes/my-routes" component={MyBikeRoutes}/>
              <Route exact path="/bikeRoutes/new" component={AddBikeRoute}/>
            </div>
          </div>
        </div>
      </Router>
    )
});

export default BikeRoutes;

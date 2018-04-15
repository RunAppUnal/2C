/* eslint-disable */
import React, { Component } from 'react';
import { Button, Card, Dimmer, Loader } from 'semantic-ui-react'
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import ShowOtherBikeRoutes from './ShowOtherBikeRoutes';
import ShowMyBikeRoutes from './ShowMyBikeRoutes';
import AddBikeRoute from './AddBikeRoute';
import registerServiceWorker from '../registerServiceWorker';
import '../css/bikeRoutes.css';

import { Query } from "react-apollo";
import gql from "graphql-tag";


class OtherBikeRoutes extends Component {
  render() {
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
                  <NavLink exact to="/bikeRoutes/" className="nav-link"><i class="fa fa-eye"></i> Rutas de otros usuarios</NavLink>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/my-bikeRoutes" className="nav-link"><i className="fa fa-search"></i> Mis rutas</NavLink>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/bikeRoutes/new" className="nav-link"><i className="fa fa-plus"></i> Crear ruta</NavLink>
                </div>
              </div>
            </div>

            <div className="col-sm-2 col-md-2 col-lg-2"></div>
          </div>
          <div>
            <div className="content">
              <Route exact path="/bikeRoutes/" component={ShowOtherBikeRoutes}/>
              <Route exact path="/my-bikeRoutes" component={ShowMyBikeRoutes}/>
              <Route exact path="/bikeRoutes/new" component={AddBikeRoute}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default OtherBikeRoutes;

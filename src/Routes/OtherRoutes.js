/* eslint-disable */
import React, { Component } from 'react';
import registerServiceWorker from '../registerServiceWorker';
import Routes from './ShowOtherRoutes'
import SearchRoute from './SearchOtherRoutes'
import '../css/vehicleAndRoute.css';
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";

class OtherRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="row">
            <h2 id="OtherRoutesTitle">Rutas creadas por otros usuarios.</h2>
            <div className="col-sm-4 col-md-4 col-lg-4"></div>

            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6" id="routesNav">
                  <NavLink exact to="/routes" className="nav-link">Todas las rutas</NavLink>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6" id="routesNav">
                  <NavLink exact to="/routes/search" className="nav-link">Buscar ruta</NavLink>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-md-4 col-lg-4"></div>
          </div>
          <div className="content">
            <Route exact path="/routes" component={Routes}/>
            <Route exact path="/routes/search" component={SearchRoute}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default OtherRoutes;

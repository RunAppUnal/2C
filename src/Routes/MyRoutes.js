import React, { Component } from 'react';
import registerServiceWorker from '../registerServiceWorker';
import Routes from './ShowMyRoutes'
import SearchRoute from './SearchMyRoutes'
import CreateRoute from './CreateRoutes'
import '../css/vehicleAndRoute.css';
import {Route, NavLink, BrowserRouter as Router} from "react-router-dom";

class MyRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="row">
            <h3 id="OtherRoutesTitle">Mis rutas</h3>
            <div className="col-sm-3 col-md-3 col-lg-3"></div>

            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/my-routes" className="nav-link"><i class="fa fa-eye"></i> Todas mis rutas</NavLink>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/my-routes/search" className="nav-link"><i className="fa fa-search"></i> Buscar ruta</NavLink>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4" id="routesNav">
                  <NavLink exact to="/my-routes/new" className="nav-link"><i className="fa fa-plus"></i> Crear ruta</NavLink>
                </div>
              </div>
            </div>

            <div className="col-sm-3 col-md-3 col-lg-3"></div>
          </div>
          <div className="content">
            <Route exact path="/my-routes" component={Routes}/>
            <Route path="/my-routes/search" component={SearchRoute}/>
            <Route path="/my-routes/new" component={CreateRoute}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default MyRoutes;

import React, { Component } from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import { Button, Menu, Image } from 'semantic-ui-react'

import logo from './logolong.png';
import './App.css';
import Profile from "./profile";
import Home from "./home";

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div>
          <header>
            <NavLink to="/">
              <img src={logo} className="logo" alt="logo" />
            </NavLink>
            <div id="right-menu">
              <NavLink to="/login"><Button inverted>Iniciar sesión</Button></NavLink>
              <NavLink to="/signup"><Button inverted color="blue">Registrarse</Button></NavLink>
            </div>
          </header>
          
          <div className="content">
            <Route exact path path="/" component={Home}/>
            <Route path="/profile" component={Profile}/>
          </div>

          <footer>
            <img src="images/logos/logocircle.png" className="icon" alt="logo" />
            <span>Copyright Runapp 2018</span>
          </footer>        
        </div>
      </HashRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import { HashRouter, NavLink, Route } from 'react-router-dom'
import Home from './Home';
import Profile from './Profile';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <header>
            <NavLink to="/">
              <img src="images/logos/logolong.png" className="logo" alt="logo" />
            </NavLink>
            <div id="right-menu">
              <NavLink to="/login"><Button inverted>Iniciar sesión</Button></NavLink>
              <NavLink to="/signup"><Button inverted color="blue">Registrarse</Button></NavLink>
            </div>
          </header>

          <div className="body">
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

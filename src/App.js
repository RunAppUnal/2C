/* eslint-disable */
import React, { Component } from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom'
import Home from './home';
import Profile from './profile';
import Login from './login';
import Signup from './signup';
import { Button } from 'semantic-ui-react'
import './css/App.css';
import { update, withAuth } from "./auth";

const AuthState = withAuth(({ auth }) => {
  if (auth.userid != null) {
    return (
      <div>
        <img className="ui avatar image" src="images/default-user.png"/>
        Bienvenido(a), {auth.username}
      </div>
    )
  } else {
    return (
      <div>
        <NavLink to="/login"><Button inverted>Iniciar sesión</Button></NavLink>
        <NavLink to="/signup"><Button inverted color="blue">Registrarse</Button></NavLink>
      </div>
    );
  }
});

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
              <AuthState/>
            </div>
          </header>

          <div className="body">
            <Route exact path path="/" component={Home}/>
            {/* <Route path="/profile" component={Profile}/> */}
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
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

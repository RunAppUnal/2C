/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import Home from './home';
import Profile from './Profile';
import { Login, Logout } from './login/login';
import Signup from './login/signup';
import { Dropdown, Button } from 'semantic-ui-react'
import './css/App.css';
import { update, withAuth, CurrUser } from "./auth";


var currUserId = localStorage.getItem('currUserId');
var currUserName = localStorage.getItem('currUserName');
console.log(currUserId);

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    currUserId > 0
      ? <Component {...props}/>
      : <Redirect to='/login'/>
  )}/>
);

const NotLoggedInRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    currUserId > 0
      ? <Redirect to='/'/>
      : <Component {...props}/>
  )}/>
);

const AuthState = withAuth(({ auth }) => {
  if(currUserId > 0) {
    let trigger = <span><img className="ui avatar image" src="images/default-user.png"/> {currUserName}</span>
    return (
      <div>
        <Dropdown trigger={trigger} pointing='top left' direction='right'>
          <Dropdown.Menu>
            <Dropdown.Item><Link to="/profile">Mi perfil</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/logout">Cerrar Sesión</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  } else {
    return (
      <div>
        <Link to="/login"><Button inverted>Iniciar sesión</Button></Link>
        <Link to="/signup"><Button inverted color="blue">Registrarse</Button></Link>
      </div>
    );
  }
});


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <Link to="/">
              <img src="images/logos/logolong.png" className="logo" alt="logo" />
            </Link>
            <div id="right-menu">
              <AuthState/>
            </div>
          </header>

          <div className="body">
            <Route exact path path="/" component={Home}/>
            <NotLoggedInRoute path="/login" component={Login}/>
            <PrivateRoute path="/logout" component={Logout}/>
            <NotLoggedInRoute path="/signup" component={Signup}/>

            <PrivateRoute path="/profile" component={Profile}/>
          </div>

          <footer>
            <img src="images/logos/logocircle.png" className="icon" alt="logo" />
            <span>Copyright Runapp 2018</span>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;

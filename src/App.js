/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import Home from './home';
import Profile from './Profile';
import OtherRoutes from './Routes/OtherRoutes';
import RouteInfo from './Routes/RouteInfo';
import BikeRoutes from './BikeRoutes';
import { Login, Logout } from './login/login';
import Signup from './login/signup';
import { Dropdown, Button } from 'semantic-ui-react'
import './css/App.css';
import { update, withAuth, CurrUser } from "./auth";


var currUserId = localStorage.getItem('currUserId');
var currUserName = localStorage.getItem('currUserName');

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
    let trigger = <span>
      <img className="ui circular inline profile image" src="images/default-user.png"/>
      <span className="profile name">{currUserName}</span>
    </span>
    return (
      <div>
        <Dropdown trigger={trigger} pointing='top left' direction='right'>
          <Dropdown.Menu>
            <Link exact to="/profile"><Dropdown.Item><i className="user icon"></i>Mi perfil</Dropdown.Item></Link>
            {/* <Link exact to="/profile/my-vehicles"><Dropdown.Item><i className="car icon"></i>Mis vehiculos</Dropdown.Item></Link>
            <Link exact to="/profile/my-routes"><Dropdown.Item><i className="road icon"></i>Mis Rutas</Dropdown.Item></Link> */}
            <Link to="/logout"><Dropdown.Item><i className="sign out icon"></i>Cerrar Sesión</Dropdown.Item></Link>
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
            <PrivateRoute path="/routes" component={OtherRoutes}/>
            <Route exact path="/route/:routeid" component={RouteInfo}/>
            <PrivateRoute path="/bikeRoutes" component={BikeRoutes}/>
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

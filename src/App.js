/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import Home from './home';
import Profile from './Profile';
import Routes from './Routes';
import { Login, Logout } from './login/login';
import Signup from './login/signup';
import { Dropdown, Button } from 'semantic-ui-react'
import './css/App.css';
import { update, withAuth, CurrUser } from "./auth";


// const auth = true;
//
// const PrivateRoute = ({component: Component, ...rest}) => (
//   <Route {...rest} render={(props) => (
//     auth
//       ? <Component {...props}/>
//       : <Redirect to='/login'/>
//   )}/>
// );


const AuthState = withAuth(({ auth }) => {
  if (auth) {
    let trigger = <span><img className="ui avatar image" src="images/default-user.png"/> {auth.username}</span>
    return (
      <div>
        <Dropdown trigger={trigger} pointing='top left' direction='right' icon={null}>
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
            {/* <h3>Current User: <CurrUser/></h3> */}

            <Route exact path path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={Signup}/>

            <Route path="/profile" component={Profile}/>
            <Route path="/routes" component={Routes}/>
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

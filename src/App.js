/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import Home from './home';
import Profile from './Profile';
import AddVehicle from './Vehicles/AddVehicle';
import MyRoutes from './Routes/MyRoutes'
import OtherRoutes from './Routes/OtherRoutes';
import RouteInfo from './Routes/RouteInfo';
import EditRoute from './Routes/EditRoute';
import BikeRoutes from './BikeRoutes';
import MyBikeRoutes from './BikeRoutes/MyBikeRoutes';
import BikeRouteInfo from './BikeRoutes/BikeRouteInfo';
import AddBikeRoute from './BikeRoutes/AddBikeRoute';
import EditBikeRoute from './BikeRoutes/EditBikeRoute';
import RoutesJoined from './MyInfo/RoutesJoined';
import { Login } from './login/login';
import Signup from './login/signup';
import { Dropdown, Button } from 'semantic-ui-react'
import './css/App.css';
import './css/Components.css';
import { update, withAuth, CurrUser } from "./auth";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";


var currUserId = localStorage.getItem('currUserId');
var currUserName = localStorage.getItem('currUserName');
var currUserToken = localStorage.getItem('currUserToken');
var currUserUid = localStorage.getItem('currUserUid');
var currUserClient = localStorage.getItem('currUserClient');


const VALIDATE_TOKEN = gql`
  query validateToken($token: String!, $client: String!, $uid: String!) {
    validateToken(
      token: $token,
      client: $client,
      uid: $uid
    ){
      success
    }
  }
`;

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    currUserId > 0
      ? <Component {...props}/>
      : <Redirect to='/login'/>
    // <Query query={VALIDATE_TOKEN} variables={{ token: currUserToken, client: currUserClient, uid: currUserUid }}>
    //   {({ loading, error, data }) => {
    //     console.log(data);
    //     if(data.length && data.validateToken.success) {
    //       console.log("yey");
    //       return (<Component {...props}/>);
    //     }
    //     else {
    //       console.log("paila");
    //       return (<Redirect to='/login'/>);
    //     }
    //   }}
    // </Query>
  )}/>
);

const NotLoggedInRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    currUserId > 0
      ? <Redirect to='/'/>
      : <Component {...props}/>
  )}/>
);

const LOGOUT_MUTATION = gql`
  mutation logout($token: String!, $client: String!, $uid: String!){
    logout(
      token: $token,
      client: $client,
      uid: $uid
    ){
      success
    }
  }
`;

function clearAll() {
  window.localStorage.clear();
}

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
            <Link exact="true" to="/profile"><Dropdown.Item><i className="user icon"></i>Mi perfil</Dropdown.Item></Link>
            <Link exact="true" to="/profile/my-vehicles"><Dropdown.Item><i className="car icon"></i>Mis vehiculos</Dropdown.Item></Link>
            <Link exact="true" to="/profile/routes-joined"><Dropdown.Item><i className="road icon"></i>Rutas unidas</Dropdown.Item></Link>
            <Dropdown.Item onClick={() => clearAll()}>
               <i className="sign out icon"></i>Cerrar Sesión
            </Dropdown.Item>


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
            <NotLoggedInRoute path="/signup" component={Signup}/>

            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute path="/profile/my-vehicles/new" component={AddVehicle}/>
            <PrivateRoute path="/routes" component={OtherRoutes}/>
            <PrivateRoute path="/my-routes" component={MyRoutes}/>
            <PrivateRoute exact path="/route/:routeid" component={RouteInfo}/>
            <PrivateRoute exact path="/route/:routeid/edit" component={EditRoute}/>
            <PrivateRoute path="/bikeRoutes" component={BikeRoutes}/>
            <PrivateRoute path="/my-bikeRoutes" component={MyBikeRoutes}/>
            <PrivateRoute path="/bikeRoutes/new" component={MyBikeRoutes}/>
            <PrivateRoute exact path="/bikeRoutes/:routeid" component={BikeRouteInfo}/>
            <PrivateRoute exact path="/bikeRoutes/:routeid/edit" component={EditBikeRoute}/>
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

import React, { Component } from 'react';
import logo from './logolong.png';
import { Button, Menu, Image } from 'semantic-ui-react'
import './App.css';

import { ApolloProvider } from "react-apollo";

class App extends Component {
  render() {
    return (
      <div>
        <header>
        <img src={logo} className="logo" alt="logo" />
          <div id="right-menu">
            <Button inverted>Iniciar sesión</Button>
            <Button inverted color="blue">Registrarse</Button>
          </div>
        </header>

        <div className="body">
          El front web mas cool del mundo mundial.
        </div>

        <footer>
          <img src="images/logos/logocircle.png" className="icon" alt="logo" />
          <span>Copyright Runapp 2018</span>
        </footer>
      </div>
    );
  }
}

export default App;

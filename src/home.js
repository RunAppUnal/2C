/* eslint-disable */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withAuth } from "./auth";
import './css/home.css';


var currUserId = localStorage.getItem('currUserId');
var currUserName = localStorage.getItem('currUserName');

class Home extends React.Component {
  mouseOver(e) {
    e.target.src = "images/" + e.target.id + ".gif";
  }

  mouseOut(e) {
    e.target.src = "images/" + e.target.id + ".jpg";
  }

  render() {
    if (currUserId > 0) {
      return (
      	<div>
          <div className="home">
            <div id ="overlay">
              <h3 className="subtitle">¿Tienes problemas para transportarte en la UN?</h3>
              <h1 className="title">¡Conoce R<span className="blue">un</span>app!</h1><br/>
              <Button size="huge" color="teal" href="#transports">Comenzar</Button>
            </div>
          </div>
className=
          <a name="transports" id="transports"></a>
          <h2 className="section-heading text-uppercase">¿En qué andas?</h2>
          <h3 className="section-subheading text-muted">Elige tu tu medio de trasporte en la UN</h3>
          <div className="ui stackable grid three column">
            <div className="column" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
              <Link exact={true} to="/routes">
                <img id="walk" className="ui centered gif bordered circular image" src="images/walk.jpg" />
                <h3 className="ui centered header">Caminando</h3>
              </Link>
            </div>

            <div className="column">
              <Link exact to="/my-routes">
                <img id="car" className="ui centered gif bordered circular image" src="images/car.jpg" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} />
                <h3 className="ui centered header">Carro o Moto</h3>
              </Link>
            </div>

            <div className="column">
              <Link exact to="/bikeRoutes">
                <img id="bike" className="ui centered gif bordered circular image" src="images/bike.jpg" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} />
                <h3 className="ui centered header">Bici</h3>
              </Link>
            </div>

          </div>
    		</div>
    	)
    } else {
      return (
      	<div>
  	  		<h1 className="ui centered header">!Bienvenido a Runapp!</h1>
  		    <h3 className="ui centered header">La solución de transporte en la Un</h3>
          <h3 className="ui centered header">Por favor inicia sesión para disfrutar de nuestros servicios.</h3>

        </div>
      );
    }
  }
}

export default Home;

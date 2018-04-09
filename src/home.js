/* eslint-disable */
import React, { Component } from 'react';
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
  	  		<h1 className="ui centered header">¿En qué andas?</h1><br/><br/>

          <div className="ui stackable grid three column">
            <div className="column" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
              <Link exact to="/routes">
                <img id="walk" className="ui centered gif bordered circular image" src="images/walk.jpg" />
                <h3 className="ui centered header">Caminando</h3>
              </Link>
            </div>

            <div className="column">
              <Link exact to="/profile/my-vehicles/new">
                <img id="car" className="ui centered gif bordered circular image" src="images/car.jpg" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} />
                <h3 className="ui centered header">Carro o Moto</h3>
              </Link>
            </div>

            <div className="column">
              <Link exact to="/">
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

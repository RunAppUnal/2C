/* eslint-disable */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withAuth } from "./auth";
import './css/home.css';

const Home = withAuth(({ auth }) => {
  if (auth) {
    return (
    	<div>
	  		<h1 className="ui centered header">!Bienvenido a Runapp! {auth.username}</h1>
			  <h3 className="ui centered header">La solución de transporte en la Un</h3>	
        <br/>
        <div class="row">
          <div class="col-sm-4">
            <div class="col-sm-12">
              <img class="homeImage" src="images/profile.png" />
            </div>
            <div class="col-sm-12">
              <Link exact to="/profile"><button class="btn btn-danger">Ver mi pefil</button></Link>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="col-sm-12">
              <img class="homeImage" src="images/route.png" />
            </div>
            <div class="col-sm-12">
              <Link exact to="/routes"><button class="btn btn-danger">Buscar ruta</button></Link>              
            </div>
          </div>
          <div class="col-sm-4">
            <div class="col-sm-12">
              <img class="homeImage" src="images/bike.png" />
            </div>
            <div class="col-sm-12">
              <button class="btn btn-danger">Ruta de bicicleta</button>
            </div>
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
});

export default Home;
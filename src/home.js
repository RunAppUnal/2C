/* eslint-disable */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";


const Home = () => (
  <div>
    <h1 className="ui centered header">!Bienvenido a Runapp!</h1>
    <h3 className="ui centered header">La solución de transporte en la Un</h3>
    <br/>
    <Link exact to="/profile">Ver mi perfil</Link>
  </div>
);

export default Home;

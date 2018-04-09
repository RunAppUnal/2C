/* eslint-disable */
import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withAuth } from "./auth";

const Home = withAuth(({ auth }) => {
  if (auth) {
    return (
    	<div>
	  		<h1 className="ui centered header">!Bienvenido a Runapp! {auth.username}</h1>
			<h3 className="ui centered header">La solución de transporte en la Un</h3>	
  		</div>
  	)
  } else {
    return (
    	<div>
	  		<h1 className="ui centered header">!Bienvenido a Runapp!</h1>
		    <h3 className="ui centered header">La solución de transporte en la Un</h3>	
  		</div>
    );
  }
});

export default Home;
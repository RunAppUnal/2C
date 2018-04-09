import React, { Component } from 'react';
import registerServiceWorker from '../registerServiceWorker';
import { Query } from "react-apollo";
import gql from "graphql-tag";


const deleteUser = gql`
	mutation deleteUser($username: USERNAME!) {
    	deleteUser(username: $username) {
      		username
    	}
  	}
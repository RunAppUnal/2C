/* eslint-disable */
import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Link, Redirect } from 'react-router-dom'
import gql from "graphql-tag";
import { withAuth } from "./auth";

const Profile = withAuth(({ auth }) => {
  if (auth) {
    return (<h1 className="ui centered header">!Bienvenido {auth.username}!</h1>)
  } else {
    return (<Redirect to="/login"/>);
  }
});

export default Profile;

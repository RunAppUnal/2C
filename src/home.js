import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <h1>Página principal.</h1>
          <p>Esta es nuestra página principal :).</p>
        </div>
      </div>
    );
  }
}

export default Home;

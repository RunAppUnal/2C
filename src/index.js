import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
  uri: "http://192.168.99.101:8000/graphql"
});

const Index = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);


ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();

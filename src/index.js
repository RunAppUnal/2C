import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import gql from "graphql-tag";
import ApolloClient from "apollo-boost";


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

const client = new ApolloClient({
  uri: "http://192.168.99.102:8000/graphql",
  connectToDevTools: true
});

client
  .query({query: gql`
    {
      vehicleById(id:1){
        plate
        brand
        color
      }
    }
  `})
  .then(data => console.log({ data }));

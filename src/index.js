import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
  uri: "http://192.168.99.101:8000/graphql"
});

const GET_MY_CARS = gql`
  {
    myVehicles(user:1){
      plate
      brand
      color
    }
  }
`;
client.query({query: GET_MY_CARS}).then(data => console.log(data));

const MyVehicles = ({ onVehicleSelected }) => (
  <Query query={GET_MY_CARS}>
    {({ loading, error, data }) => {
      if (loading) return "CARGANDO TUS VEHÍCULOS...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="VEHICLE" onChange={onVehicleSelected}>
          {data.myVehicles.map(vehicle => (
            <option key={vehicle.plate} value={vehicle.brand}>
              {vehicle.brand} - {vehicle.color}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

const Index = () => (
  <ApolloProvider client={client}>
    <MyVehicles/>
  </ApolloProvider>
);


ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();

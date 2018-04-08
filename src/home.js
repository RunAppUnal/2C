/* eslint-disable */
import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
  uri: "http://192.168.99.101:8000/graphql"
});


// const GET_MY_CARS = gql`
//   {
//     myVehicles(user:1){
//       plate
//       brand
//       color
//     }
//   }
// `;
// client.query({query: GET_MY_CARS}).then(data => console.log(data));
//
// const MyVehicles = () => (
//   <Query query={GET_MY_CARS}>
//     {({ loading, error, data }) => {
//       if (loading) return "CARGANDO TUS VEHÍCULOS...";
//       if (error) return `Error! ${error.message}`;
//
//       return (
//         <select name="VEHICLE">
//           {data.myVehicles.map(vehicle => (
//             <option key={vehicle.plate} value={vehicle.brand}>
//               {vehicle.brand} - {vehicle.color}
//             </option>
//           ))}
//         </select>
//       );
//     }}
//   </Query>
// );

const Home = () => (
  <ApolloProvider client={client}>
    <h1 className="ui centered header">!Bienvenido a Runapp!</h1>
    <h3 className="ui centered header">La solución de transporte en la Un</h3>
  </ApolloProvider>
);

export default Home;

/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import App from './App';
import './css/index.css';

import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
  uri: "http://192.168.99.101:8000/graphql"
});

// const Index = () => (
//   <ApolloProvider client={client}>
//     <App/>
//   </ApolloProvider>
// );

class Index extends React.Component{
  getChildContext() {
    return { message: "From Grandparent" };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <div>message: {this.context.message}</div>
          <App/>
        </div>
      </ApolloProvider>
    );
  }
};
Index.childContextTypes = {
  message: PropTypes.string
};


ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();

export const currentUser = React.createContext({userid: null, username: null, email: null, name: null, lastname: null});

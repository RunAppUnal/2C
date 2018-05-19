/* eslint-disable */
import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GET_USER_DATA = gql`
  query userById($userid: Int!){
    userById(userid: $userid){
      id
      name
      lastname
      username
      email
    }
  }
`;

class GetUser extends Component {
  render() {
    let userid = this.props.userId;

    return (
      <Query query={GET_USER_DATA} variables={{ userid: userid }}>
        {({ loading, error, data }) => {
          if (loading) return "Cargando...";
          if (error) return `Error! ${error.message}`;
          let mailTo = 'mailto:' + "" + data.userById.email;
          const extra = (
            <div>
              {data.userById.email}<br/>
              <a href={mailTo}><i className="mail icon"></i> Enviar correo</a>
            </div>
          )

          return (
            <Card className="user"
              image={`/images/users/user_${data.userById.id%3}.jpg`}
              header={`${data.userById.name} ${data.userById.lastname}`}
              meta={data.userById.username}
              description={extra}
            />
          );
        }}
      </Query>
    )
  }
};

class GetUserName extends Component {
  render() {
    let userid = this.props.userId;

    return (
      <Query query={GET_USER_DATA} variables={{ userid: userid }}>
        {({ loading, error, data }) => {
          if (loading) return "Cargando...";
          if (error) return `Error! ${error.message}`;

          return (
            <span>
              {data.userById.name} {data.userById.lastname}
            </span>
          );
        }}
      </Query>
    )
  }
};

export { GetUserName, GetUser };

/* eslint-disable */
import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GET_USER_DATA = gql`
  query userById($userid: Int!){
    userById(userid: $userid){
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

          return (
            <tr>
              <td>
                <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""/>
                <a href="#" class="user-link">{data.userById.name} {data.userById.lastname}</a>
                <span class="user-subhead">{data.userById.username}</span>
                <span class="label label-default">{data.userById.email}</span>
                <a href={mailTo} class="table-link">
                  <span class="fa fa-envelope-square"> Enviar correo</span>
                </a>
              </td>
            </tr>
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

import React, { Component } from 'react';
import logo from './logolong.png';
import { Button, Menu, Image } from 'semantic-ui-react'
import './App.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="body">
          El front web mas cool del mundo mundial. Home
          <div>
            <h2>HELLO</h2>
            <p>Cras facilisis urna ornare ex volutpat, et
            convallis erat elementum. Ut aliquam, ipsum vitae
            gravida suscipit, metus dui bibendum est, eget rhoncus nibh
            metus nec massa. Maecenas hendrerit laoreet augue
            nec molestie. Cum sociis natoque penatibus et magnis
            dis parturient montes, nascetur ridiculus mus.</p>
     
            <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

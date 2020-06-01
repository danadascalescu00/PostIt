import React, {Component} from 'react';
import {DropdownItem} from "react-bootstrap";

class DropdownItemLogIn extends Component{
  render(){
      return <DropdownItem onClick={this.props.loginWithSocialNetworkName}>
        <i className="ni ni-single-02"/>
        <span>Login with {this.props.socialNetworkName}</span>
      </DropdownItem>
    }
}

export default DropdownItemLogIn;
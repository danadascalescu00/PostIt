import React, {Component} from 'react';
import {DropdownItem} from "react-bootstrap";

class DropdownItemLogIn extends Component{
  render(){
      return <DropdownItem onClick={this.props.loginWithSocialNetworkName}>
        <span className="dropdown-item-text">Login with {this.props.socialNetworkName}</span>
      </DropdownItem>
    }
}

export default DropdownItemLogIn;

import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import DropdownItemLogIn from "../containers/DropdownItemLogIn";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import axios from "axios";
import logo from "./logo.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const linkLogoStyle = {
  container: (isRowBased) =>({
    width: isRowBased ? 'auto' : '100px',
  })
};



class HeaderDash extends React.Component {
  render() {
    return (
      <>
        <Navbar >
          <Container fluid>
            <a href="/" >
              <img className = "logo-dash" src = {logo} alt = "Logo"/>
            </a>
            <Nav className="ml-auto">

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <Avatar name={this.props.username} round={true} size={"25"}/>
                    </span>
                    <Media className="ml-2  d-lg-block">
                      <span className="ml-0 text-dark font-weight-bold">
                        My Profile
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu direction="left" className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="dropdown-item-text">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItemLogIn
                    loginWithSocialNetworkName={this.props.loginWithFacebook}
                    socialNetworkName='Facebook'
                  />
                  <DropdownItemLogIn
                    loginWithSocialNetworkName={this.props.loginWithReddit}
                    socialNetworkName='Reddit'
                  />
                  <DropdownItemLogIn
                    loginWithSocialNetworkName={this.props.loginWithTwitter}
                    socialNetworkName='Twitter'
                  />
                  <DropdownItem href='/'>
                    <i className="ni ni-support-16" />
                    <span className="dropdown-item-text">Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.logOut}  >
                    <span className="dropdown-item-text">Log out</span>
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default HeaderDash;



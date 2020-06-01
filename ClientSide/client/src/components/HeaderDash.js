
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


class HeaderDash extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <Avatar name={"Cristian Stern"} round={true} size={"70"}/>
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="ml-0 text-dark font-weight-bold">
                        {this.props.username}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItemLogIn
                    loggedIn={this.props.loggedFacebook}
                    loginWithSocialNetworkName={this.props.loginWithFacebook}
                    socialNetworkName='Facebook'
                  />
                  <DropdownItemLogIn
                    loggedIn={this.props.loggedReddit}
                    loginWithSocialNetworkName={this.props.loggedReddit}
                    socialNetworkName='Reddit'
                  />
                  <DropdownItemLogIn
                    loggedIn={this.props.loggedTwitter}
                    loginWithSocialNetworkName={this.props.loggedTwitter}
                    socialNetworkName='Twitter'
                  />
                  <DropdownItem href='/Aboutus'>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.logOut}  >
                    <i className="ni ni-user-run" />
                    <span>Log out</span>
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



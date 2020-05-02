/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Modal from 'react-bootstrap/Modal';
import PostField from './PostField';
import './Profile.css'
import FacebookCard from './FacebookCard'
import RedditCard from './RedditCard'
import TwitterCard from './TwitterCard'
import SamplePreview from './SamplePreview'

import {
  LinkButtons,
  deleteButton,
  updateButton,
  loginButton,
  logoutButton,
  HeaderBar,
  linkStyle,
  forgotButton,
} from '../components';

const envDomain = 'localhost'

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'User Profile Screen',
};

class Profile extends Component {

  // prevents memory leaks because of the 
  // async state change in componentDidMount
  _isMounted = false;

  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: '',
      isLoading: true,
      deleted: false,
      error: false,
      show: false
    };
    
  }

  async componentDidMount() {
    this._isMounted = true;
    const accessString = localStorage.getItem('JWT');
    const {
      match: {
        params: { username },
      },
    } = this.props;
    console.log('params')
    console.log('username')
    console.log(username)
    console.log(this.props)
    if (accessString == null) {
      this.setState({
        isLoading: false,
        error: true,  
      });
    } else {
      try {
        const response = await axios.get(`http://${envDomain}/api/user`, {
          params: {
            username,
          },
          headers: { authorization: `JWT ${accessString}` },
        });
        this.setState({
          username: response.data.username,
          password: response.data.password,
          isLoading: false,
          error: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({
          error: true,
        });
      }
    }
  }

  textViewChanged = (value) => {
		this.setState({content: value})
  }
  
  textViewChangedTitle = (value) => {
		this.setState({title: value})
	}
  
  componentWillUnmount() { this._isMounted = false }

  handleModal = () => { this.setState({show: true}) }

  loginReddit = () => {
    window.location.assign(`http://${envDomain}/login/reddit`)
  }

  loginFacebook = () => {
    window.location.assign(`http://${envDomain}/login/facebook`)
  }

  loginTwitter = () => {
    window.location.assign(`http://${envDomain}/login/twitter`)
  }

  logout = async (e) => {
    e.preventDefault();
    
    const accessString = localStorage.getItem('JWT');
    try {
      const response = await axios.get(`http://${envDomain}/api/logout`, {
        headers: { authorization: `JWT ${accessString}` },
      });
      console.log("successfull logout")
      localStorage.removeItem('JWT');
    } catch (error) {
      console.error(error);
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const {
      username,
      password,
      error,
      isLoading,
      deleted,
      show
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>
            Problem fetching user data. Please login again.
          </div>
          <LinkButtons
            buttonText="Login"
            buttonStyle={loginButton}
            link="/login"
          />
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    if (deleted) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <HeaderBar title={title} />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>{username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Password</TableCell>
              <TableCell style={{ WebkitTextSecurity: 'disc' }}>
                {password}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <>
          
          <Button 
          variant="contained"
          color="primary"
          onClick={this.handleModal}
          >
            Create a post
          </Button>

          
          <Modal
            className="postModal"
            show={show}
            centered={true}
            onHide={() => this.setState({show: false})}
          >
            <Modal.Header closeButton>
              <Modal.Title id="postModalTitle">
                <center>Create a new post</center>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body id="postModalBody">

              <br /> <br /> <br />
              <PostField change={this.textViewChanged} title={this.textViewChangedTitle}/>
              <div className='modalPreview'> <br /> <br />Preview </div>
              <div className="cards">
            <FacebookCard content={this.state.content} />
            <RedditCard   content={this.state.content} title={this.state.title}/>
            <TwitterCard  content={this.state.content}/>
              </div>
            </Modal.Body>
          </Modal>
        </>
        {/* <Button
          style={deleteButton}
          variant="contained"
          color="primary"
          onClick={this.deleteUser}
        >
          Delete User
        </Button>
        <LinkButtons
          buttonStyle={updateButton}
          buttonText="Update User"
          link={`/updateUser/${username}`}
        />
        <LinkButtons
          buttonStyle={forgotButton}
          buttonText="Update Password"
          link={`/updatePassword/${username}`}
        /> */}

        {/* <Button><a href=`http://${envDomain}/login/facebook`>Login with Facebook</a></Button> */}
        <Button
          onClick={this.loginFacebook}>
          Login with Facebook
        </Button>
        <Button
          onClick={this.loginReddit}>
          Login with Reddit
        </Button>
        <Button
          onClick={this.loginTwitter}>
          Login with Twitter
        </Button>
        <Button
          style={logoutButton}
          variant="contained"
          color="primary"
          onClick={this.logout}
        >
          <Link style={linkStyle} to="/">
            Logout
          </Link>
        </Button>
      </div>
    );
  }
}

Profile.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default Profile;
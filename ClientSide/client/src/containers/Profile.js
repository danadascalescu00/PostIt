/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component, useState } from 'react';
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
import FacebookCardMobile from './FacebookCardMobile'
import RedditCardMobile from './RedditCardMobile'
import TwitterCardMobile from './TwitterCardMobile'

import './Profile.css'
import classnames from 'classnames';
import FacebookCard from './FacebookCard'
import RedditCard from './RedditCard'
import Avatar from 'react-avatar'
import TwitterCard from './TwitterCard'
import SamplePreview from './SamplePreview'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';


import {
  LinkButtons,
  deleteButton,
  updateButton,
  loginButton,
  logoutButton,
  HeaderDash,
  HeaderLogIn,
  linkStyle,
  forgotButton,
} from '../components';
import icons from "./Images/all_iconscpy.png";

const envDomain = 'https://postit.software'

const loading = {
  margin: '1em',
  fontSize: '24px',
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
      show: false,
      postReddit: false,
      postTwitter: false,
      postFacebook: false,
      redditLoggedIn: false,
      twitterLoggedIn: false,
      facebookLoggedIn: false,
    };

    this.postHandler = this.postHandler.bind(this);
  }

  isLoggedIn(status) {
    
    if (status == 'logged in')
      return true
    else if (status == 'not logged in')
      return false
    console.log('an error occured')

    return false
  }

  postHandler = (socialMedia, value) => {
    if (socialMedia === 'facebook')
      this.setState({postFacebook: value})
    else if (socialMedia === 'twitter')
      this.setState({postTwitter: value})
    else if (socialMedia === 'reddit')
      this.setState({postReddit: value})
  }

  async componentDidMount() {
    this._isMounted = true;
    const accessString = localStorage.getItem('JWT');
    const {
      match: {
        params: { username },
      },
    } = this.props;

    if (accessString == null) {
      this.setState({
        isLoading: false,
        error: true,
      });
    } else {
      try {
        const response = await axios.get(`${envDomain}/api/user`, {
          params: {
            username,
          },
          headers: { authorization: `JWT ${accessString}` },
        });

        const redditActions = this.isLoggedIn(response.data.reddit)
        const twitterActions = this.isLoggedIn(response.data.twitter)
        const facebookActions = this.isLoggedIn(response.data.facebook)

        this.setState({
          username: response.data.username,
          password: response.data.password,
          isLoading: false,
          error: false,
          postReddit: redditActions,
          postTwitter: twitterActions,
          postFacebook: facebookActions,
          redditLoggedIn: redditActions,
          twitterLoggedIn: twitterActions,
          facebookLoggedIn: facebookActions,
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
    window.location.assign(`${envDomain}/login/reddit`)
  }

  loginFacebook = () => {
    window.location.assign(`${envDomain}/login/facebook`)
  }

  loginTwitter = () => {
    window.location.assign(`${envDomain}/login/twitter`)
  }

  logout = async (e) => {
    e.preventDefault();

    const accessString = localStorage.getItem('JWT');
    try {
      const response = await axios.get(`${envDomain}/api/logout`, {
        headers: { authorization: `JWT ${accessString}` },
      });
      window.location.href='/';
      console.log("successfull logout")
      localStorage.removeItem('JWT');
    } catch (error) {
      console.log("error to logout")
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
      show,
      postReddit,
      postTwitter,
      postFacebook,
      redditLoggedIn,
      twitterLoggedIn,
      facebookLoggedIn, 
    } = this.state;
    
    if (error) {
      return (
        <div>
          <HeaderDash/>
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
          <HeaderDash
          loginWithFacebook={this.loginFacebook}
          loginWithTwitter={this.loginTwitter}
          loginWithReddit={this.loginReddit}
          logOut={this.logout}
          username={username}
          />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    if (deleted) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <HeaderDash
          loginWithFacebook={this.loginFacebook}
          loginWithTwitter={this.loginTwitter}
          loginWithReddit={this.loginReddit}
          logOut={this.logout}
          username={username}/>

        <>
          <div className="create-post">
            <h2>
              Create a post
            </h2>
            <div className="showMobile">
              <FacebookCardMobile
                username={this.state.username}
                loggedIn={facebookLoggedIn}
                content={this.state.content}
                handlePost={this.postHandler}
              />
              <RedditCardMobile
                username={this.state.username}
                title={this.state.title}
                loggedIn={redditLoggedIn}
                content={this.state.content}
                handlePost={this.postHandler}
              />
              <TwitterCardMobile
                username={this.state.username}
                loggedIn={twitterLoggedIn}
                content={this.state.content}
                handlePost={this.postHandler}
              />
            </div>
            <PostField
              canPostReddit={postReddit}
              canPostTwitter={postTwitter}
              canPostFacebook={this.state.postFacebook}
              change={this.textViewChanged}
              title={this.textViewChangedTitle}
            />
          </div>
          <img src={icons} alt="icons"  className="icons"/>
          <div className="cards-section">
            <div className='modalPreview'> <br /> <br /><i>Tap on the cards you want to post</i></div>
            <div className="cards show-desktop">
              <FacebookCard
                username={this.state.username}
                loggedIn={facebookLoggedIn}
                content={this.state.content}
                handlePost={this.postHandler}
              />
              <RedditCard
                username={this.state.username}
                title={this.state.title}
                loggedIn={redditLoggedIn}
                content={this.state.content}
                handlePost={this.postHandler}
              />
              <TwitterCard
                username={this.state.username}
                loggedIn={twitterLoggedIn}
                content={this.state.content}
                handlePost={this.postHandler}
              />
            </div>
          </div>
        </>

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
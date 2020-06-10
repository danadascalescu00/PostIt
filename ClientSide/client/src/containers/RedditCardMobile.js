import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './RedditCard.css'
import downvote from './Images/downvoteReddit.png'
import upvote from './Images/upvoteReddit.png'
import comment from './Images/CommentIconReddit.png'
import footer from './Images/RedditStuff.png'
import redditIcon from './Images/redditIcon.png'



const useStyles = makeStyles({
    root: {
      minWidth: 105,
      width: 105,
      minHeight: 105,
      display: 'inline-block',
      paddingLeft: 15,
      paddingRight: 15,
      boxShadow: '0px 11px 35px -5px rgba(0,0,0,0.57)', //'0px 0px 30px 0px rgba(0,0,0,0.2), 0px 0px 4px 0px rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12)',
      borderRadius: '10px',
      cursor: 'pointer',
      userSelect: 'none',
    },
    disabledRoot: {
      minWidth: 105,
      width: 105,
      minHeight: 105,
      display: 'inline-block',
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: '10px',
      opacity: 0.6,
      cursor: 'pointer',
      userSelect: 'none',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function RedditCardMobile(props) {

  const classes = useStyles();
  const [enabled, setEnabled] = useState(props.loggedIn)

  function toggleEnabled() {
    props.handlePost('reddit', !enabled)
    setEnabled(!enabled)
  }

  return (
    <Card className=
    {
      enabled === true
      ? classes.root
      : classes.disabledRoot
    } onClick={() => props.loggedIn ? toggleEnabled() : ()=>{}}
    >      
        <div className='HeaderCard'>
          <img 
            src={redditIcon}
            width='80px' height='80px'
            style={{borderRadius: '20px', transform: 'translateY(20%)'}} 
          />
        </div>
    </Card>
  );
}
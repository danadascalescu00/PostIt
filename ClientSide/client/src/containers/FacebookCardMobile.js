import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import facebookIcon from './Images/facebookIcon1.png';
import './FacebookCard.css';


function capitalize_Words(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

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
  isMobile:{
    display:"none",
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


export default function FacebookCardMobile(props) {
    const classes = useStyles();
    const [enabled, setEnabled] = useState(props.loggedIn)
    // classes.root.display="none"
    function toggleEnabled() {
      props.handlePost('facebook', !enabled)
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
            src={facebookIcon}
            width='80px' height='80px'
            style={{borderRadius: '20px', transform: 'translateY(20%)'}} 
          />
        </div>
      </Card>
    );
  }
  
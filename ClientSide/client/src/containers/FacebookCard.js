import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import facebookIcon from './facebookIcon1.png'
import './FacebookCard.css'

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width: 500,
    display: 'inline-block',
    margin: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    boxShadow: '0px 0px 35px -5px rgba(0,0,0,0.57)', //'0px 0px 30px 0px rgba(0,0,0,0.2), 0px 0px 4px 0px rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px'
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

export default function FacebookCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <div className='HeaderCard'>
        <img src={facebookIcon} style={{borderRadius: '20px', transform: 'translateY(20%)'}} width='35px' height='35px'/>
        <div className='fbProfile'>
          <div><b>Andrei Liviu</b></div>
          <div style={{fontSize: 'small', color: 'grey'}}>Just now</div>
        </div>
      </div>
      <CardContent>
        <Typography variant="body2" component="p">
          {
            props.content
            ? props.content
            : <span style={{color: 'grey'}}>Great to post from here</span>
          }
        </Typography>
      </CardContent>
      <div class='FooterCard'>
        <div class='FooterContainerLeft'>
          <span>150 likes</span>
        </div>
        <div class='FooterContainerRight'>
          <span>20 comments</span>  <span>8 shares</span>
        </div>
      </div>
    </Card>
  );
}

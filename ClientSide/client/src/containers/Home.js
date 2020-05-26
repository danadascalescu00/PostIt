import React from 'react';
import './App.css';
import './Home.css';
import Nav from './Nav.js';
import { Button } from "../components/Button"
import Footer from "../components/Footer"
import laptopImage from '../components/Assets/laptop_1hdpi.png';
import icon1 from '../components/Assets/social.png';
import icon2 from '../components/Assets/monitoring.png';
import icon3 from '../components/Assets/creative.png';
import blob from '../components/Assets/blob_shape.png';

const navOptions = [
    {option: 'Home'},
    {option: 'About us'},
    {option: 'Log In'},
    {option: 'Sign Up'},
    {option: 'Contact us'}
  ];

const styleImage = {
  // backgroundImage: `url(${desktopImage})`,
    
}

const laptopStyle = {
  width: "24%",
  position: "relative",
  left: "6%",
  marginTop: "5%",
  zIndex: "4"
}

const agentStyle = {
  position: "relative",
  width: "3%",
  top: "13em",
  left:"7%",
  zIndex: "8"
}

const dolarStyle = {
  position: "relative",
  width: "5.5%",
  marginTop: "23.5%",
  left:"-22.25%",
  zIndex: "5",
}

const cloudsStyle = {
  position: "relative",
  width: "19%",
  marginTop: "-16%",
  left:"-28%",
  zIndex: "3"
}

const itemsStyle = {
  position: "relative",
  width: "18%",
  marginTop: "-21%",
  left:"-47%",
  zIndex: "3"
}

const arrowStyle = {
  position: "relative",
  width: "6%",
  marginTop: "-17%",
  left:"-48.5%",
  zIndex: "6"
}

const pagesStyle = {
  position: "relative",
  width: "18%",
  marginTop: "0%",
  left:"-56%",
  zIndex: "3"
}

const glassStyle = {
  position: "relative",
  width: "13%",
  top: "-24em",
  left:"3em",
  zIndex: "4",
} 

const checkedStyle = {
  position: "relative",
  width: "5.5%",
  left:"-29em",
  top: "-12em",
  zIndex: "4",
} 

const phoneStyle = {
  position: "relative",
  width: "12%",
  left: "-36em",
  top: "-8em",
  zIndex: "4",
} 

const graphStyle = {
  position: "relative",
  width: "9%",
  top: "-37em",
  left:"-10em",
  zIndex: "4",
}

const iconStyle = {
  zIndex: "10",
  width: "55%",
  marginBottom: "8%"
}


function Home() {
  
    return (
      <div className="HomePage" style = {styleImage}>
          <div className="HomePageContent">
              <Nav items={navOptions}></Nav>
              <div className="Isometric ">
                <img src = {laptopImage} alt="laptop" style={laptopStyle}/>
>

                <h1 className="title">BUSINESS</h1>

                <h2 className="subtitle">Make it real!</h2>

                <div className="text-box">
                  <p> Simultaneusly post content to multiple social media sites, BI Service and ML Insights
                      for everyone in your organisation.
                   </p>
                </div>
                <Button type="button" buttonStyle="my--btn--primary--solid " buttonSize="my--btn--large">GET STARTED</Button>
              </div>

              <div className="myContainer">

                <h2 className="emphasize">Why PostIt?</h2>

                <div className="flexContainer">

                    <div className="container3Columns">
                      <img src={icon1} alt="social-media" style={iconStyle}/>
                      <p>View and manage all your social campaigns in a single  platform.</p>
                    </div>

                    <div className="container3Columns">
                      <img src={icon2} alt="monitoring" style={iconStyle}/>
                      <p>Our social media monitoring tools let you find out what your customers are doing, 
                         feeling, and thinking when it comes to your brand.
                      </p>
                    </div>

                    <div className="container3Columns">
                      <img src = {icon3} alt="creativity" style = {iconStyle}/>
                      <p>Make it easy for your entire team to create beautiful, engaging posts for every social network</p>
                    </div>
                </div>
              </div>
          </div>

          <div className="container2">
            <div className="container2Columns">
              <h2>Discover what's possible when you get social</h2>
              <p> PostIt has the tool you need to succeed on every social media.
                  From building your brand to delivering customer care, keep the conversation flowing 
                  seamlessly across public channels and private messages, publish content to the right 
                  apps at the right time, track effectiveness in real time, and crank the volume on 
                  your top-performing content just in one platform.
              </p>
            </div>
            <div className="container2Columns">
              <img src={blob}/>
            </div>
          </div>

          <Footer></Footer>
      </div>
    );
}


export default Home;
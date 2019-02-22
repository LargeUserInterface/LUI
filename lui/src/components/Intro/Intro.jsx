import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import backDrop from './backdrop.png';
import './Intro.css';
import { css } from 'glamor';
import glamorous from 'glamorous'
import { withStyles } from '@material-ui/core/styles';
import Particles from 'react-particles-js';

const particleOpt = require('./particles.json');

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

const slideOut = css.keyframes({
  '100%': { transform: 'translateX(-100%)' },
})

const styles = {

  backDrop: {
    width: '100%',
    height: '100%',
  }
};

const Wrapper = glamorous.div(props => ({
  animation: props.isMounted ? `${fadeIn} 1s` : props.page === "app"? '' : `${slideOut} 1s`,
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: 5
}))

function Intro(props) {
  const { classes } = props;

  return (
    <Wrapper isMounted={props.isMounted} page={props.page}>
      
      <div>
      <div className={classes.backDrop} >
        <Particles 
            params={particleOpt} 
            style={{zIndex:5, position: 'absolute'}}
        />
      </div>
      
      <div > 
      <img className={classes.backDrop} src={backDrop} style={{zIndex:1,position: 'absolute'}} />
      </div>
      </div>

    </Wrapper>
    
    

    );

}

export default withStyles(styles)(Intro);



 

import React from 'react';
import backDrop from './backdrop.png';
import './Intro.css';
import { css } from 'glamor';
import glamorous from 'glamorous'
import { withStyles } from '@material-ui/core/styles';


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
      <img className={classes.backDrop} src={backDrop} />
    </Wrapper>
  );
}

export default withStyles(styles)(Intro);

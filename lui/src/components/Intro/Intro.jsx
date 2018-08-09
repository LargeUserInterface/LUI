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
  '100%': { transform: 'translateY(-100%)' },
})

const styles = {

  backDrop: {
    width: '100vw',
    height: '100vh',
  }
};

const Wrapper = glamorous.div(props => ({
  animation: props.isMounted ? `${fadeIn} 3s` : `${slideOut} 1s`,
  width: '100%',
  height: '100%'
}))

function Intro(props) {
  const { classes } = props;

    return (
      <Wrapper isMounted={props.isMounted} delay={props.delay}>
        <img className={classes.backDrop} src={backDrop} />
      </Wrapper>
    );
}

export default withStyles(styles)(Intro);

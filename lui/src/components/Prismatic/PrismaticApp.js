import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Leap from './leap.js'
import { Redirect } from 'react-router';
import Prismatic from '@magicleap/prismatic'

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    margin: '0 auto',
    padding: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    listStyle: 'none',
    overflow: 'visible',
    zIndex: '1',
    backgroundColor: "#ECEFF1"
  },

  frameContainer: {
    display: 'inline-block',
    width: '31.5%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    padding: '0px',
    margin: '10px',
    position: 'relative',
    border: '2px solid #37474F',
    boxShadow: '10px 10px 5px #ccc',
  },

  hovered: {
    transform: 'scale(1.1)',
    animationDuration: '1s'
  },

};

class PrismaticApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    handleExit = () => {
      console.log("exit");
      this.setState({
        exit: true
      })
    }


    render() {

        const { classes } = this.props;

        if (this.state.exit) {
          return <Redirect to={{ pathname: "/" }} />
        }

        return (
            <div className={classes.container}>
                <div>
                    "Hello Prismatic!"
                </div>
                <div>
                    <ml-model
                        id="earth"
                        src="earth.fbx"
                        style="width: 300px; height: 300px;"
                        z-offset="-500px"
                        unbounded="true"
                        extractable="true"
                        rotate-by-angles=" angles: 0 -5 0; duration: 30s;track: 1;">
                    </ml-model>
                </div>
            </div>
        );
      }
  }

export default withStyles(styles)(PrismaticApp);

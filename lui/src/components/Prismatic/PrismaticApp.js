import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Redirect } from 'react-router';
// import Leap from './leap.js'
// import Prismatic from '@magicleap/prismatic'
import ReactThreeFbxViewer from 'react-three-fbx-viewer';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    margin: '0 auto',
    padding: '2px',
    backgroundColor: '#FFF',
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

let fbxUrl = require('./Haku.fbx');

class PrismaticApp extends Component {

  constructor(props) {
    super(props);
  }

  onLoad(e) {
    console.log(e);
  }

  onError(e) {
    console.log(e);
  }
  render () {
    const { classes } = this.props;

    let cameraPosition = {
      x:10,
      y:100,
      z:150,
    }

    return (
      <div className={classes.container}>
        <ReactThreeFbxViewer cameraPosition={cameraPosition} url={fbxUrl} onLoading={this.onLoad} onError={this.onError}/>
      </div>
    );
  }
}

export default withStyles(styles)(PrismaticApp)

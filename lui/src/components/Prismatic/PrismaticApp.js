import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Redirect } from 'react-router';
// import Leap from './leap.js'
import Prismatic from '@magicleap/prismatic'
import ReactThreeFbxViewer from 'react-three-fbx-viewer';

const styles = {
  container: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    left: '0',
    margin: '0 auto',
    padding: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    listStyle: 'none',
    overflow: 'visible',
    zIndex: '10',
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

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //       cameraPosition_x: 10,
  //       cameraPosition_y: 50,
  //       cameraPosition_z: 150,
  //       angle:45,
  //   }
  // }
  //
  // componentDidMount() {
  //     setInterval(this.autospin,1000);
  // }
  //
  // autospin = () => {
  //     this.setState(prevState => ({
  //         cameraPosition_x: prevState.cameraPosition_x + 5,
  //         cameraPosition_y: prevState.cameraPosition_y + 5,
  //         cameraPosition_z: prevState.cameraPosition_z - 5,
  //         angle: prevState.angle + 2,
  //     }))
  //
  //     // console.log(this.state.cameraPosition_x)
  // }
  //
  // onLoad(e) {
  //   console.log(e);
  // }
  //
  // onError(e) {
  //   console.log(e);
  // }
  // render () {
  //   const { classes } = this.props;
  //
  //   let cameraPosition = {
  //     x:this.state.cameraPosition_x,
  //     y:this.state.cameraPosition_y,
  //     z:this.state.cameraPosition_z,
  //   }
  //
  //   // let controlPosition = {
  //   //     x:this.state.cameraPosition_x,
  //   //     y:this.state.cameraPosition_y,
  //   //     z:this.state.cameraPosition_z,
  //   // }
  //
  //   console.log(this.state.angle)
  //
  //   return (
  //     <div className={classes.container}>
  //       <title>Hello Prismatic!</title>
  //       <ReactThreeFbxViewer cameraPosition={cameraPosition} angle={this.state.angle} url={fbxUrl} onLoading={this.onLoad} onError={this.onError}/>
  //     </div>
  //   );
  // }
  constructor(props) {
      super(props);
  }

  render() {
      const { classes } = this.props

      return (
          <div className={classes.container}>
            <ml-model
                id="ballon"
                src="balloon.fbx" >
            </ml-model>
          </div>
      )
  }
}

export default withStyles(styles)(PrismaticApp)

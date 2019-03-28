import React, { Component } from 'react';
import Leap from './leap'
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';

const styles = {
  // container: {
  //   position: 'fixed',
  //   top: '0px',
  //   left: '0px',
  //   height: '100vh',
  //   width: '100vw',
  //   backgroundCOlor: "#CFD8DC"
  // },
  
  button: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    color: "rgba(50,50,50,0.8)",
  },
}
class PrismaticApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exit: false,
    }
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
      return <Redirect to={{ pathname: "/Home" }} />
    }

    return (
      <div>
        <Leap
          handleExit={this.handleExit}
        />
        <ml-model
          id="portal2"
          src="cube.fbx"
          style={{
            position: 'absolute', top: '50%', left: '50%', width: '500px', height: '500px', transform: 'translate(-50 %, -50 %)',
          }}
        />
        <div className = "container">
          <Button onClick={() => this.handleExit()}  className={classes.button}>
                <Home/>
          </Button>
        </div>
      </div>

    );

  }
};

export default withStyles(styles)(PrismaticApp);

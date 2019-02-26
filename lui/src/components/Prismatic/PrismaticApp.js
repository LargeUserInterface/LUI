import React, { Component } from 'react';
import Leap from './leap'
import { Redirect } from 'react-router';

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
    if (this.state.exit) {
      return <Redirect to={{ pathname: "/" }} />
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
      </div>

    );

  }
};

export default PrismaticApp

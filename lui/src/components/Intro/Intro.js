import React, { Component } from 'react';
import backDrop from './backdrop.png';
import './Intro.css';

class Intro extends Component {
  render() {

    return (
        <img id="backDrop" src={backDrop} />
    );
  }
}

export default Intro;

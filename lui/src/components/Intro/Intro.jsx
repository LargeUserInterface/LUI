import React from 'react';
import backDrop from './backdrop.png';
import './Intro.css';

function Intro(props) {

  if (props.page === "intro") {
    return (
      <img id="backDrop" src={backDrop} />
    );
  }
  return <div />
}

export default Intro;

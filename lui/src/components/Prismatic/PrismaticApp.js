import React, { Component } from 'react';
import renderHTML from 'react-render-html';

// var html = require('./Hello_Prismatic/index.html')

const PrismaticApp= function(props) {

  return (
    <ml-model
      id="portal2"
      src="cube.fbx"
      style={{
        position: 'absolute', top: '50%', left: '50%', width: '500px', height: '500px', transform: 'translate(-50 %, -50 %)',
      }}
   />
  );
};

export default PrismaticApp

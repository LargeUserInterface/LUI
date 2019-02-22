import React, { Component } from 'react';
import renderHTML from 'react-render-html';

var html = require('./Hello_Prismatic/index.html')
class PrismaticApp extends Component {
  
  constructor(props) {
      super(props);
  }

  render() {
      const { classes } = this.props
      return (
        <div className='app'>
          {renderHTML(html)}
        </div>
      )
  }
}

export default PrismaticApp

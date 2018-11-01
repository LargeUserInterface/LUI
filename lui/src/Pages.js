import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Intro from './components/Intro/Intro.jsx';
import Photos from './components/Photos/PhotosApp.jsx';
import Videos from './components/Videos/VideosApp.js';
import Model from './components/Model/ModelApp.js';
import Prismatic from './components/Prismatic/PrismaticApp.js';

class Pages extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/Photos' component={Photos}/>
          <Route path='/Videos' component={Videos}/>
          <Route path='/Model' component={Model}/>
          <Route path='/Prismatic' component={Prismatic}/>
          <Route path='*' component={Intro}/>
        </Switch>
      </Router>
    );
  }
}

export default Pages;

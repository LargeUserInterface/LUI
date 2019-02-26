import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Intro from './components/Intro/Intro.jsx';
import Photos from './components/Photos/PhotosApp.jsx';
import Videos from './components/Videos/VideosApp.js';
import GestureKeyboard from './components/GestureKeyboard/GestureKeyboardApp.jsx';
import CandyCrush from './components/CandyCrush/CandyCrushApp';
import Model from './components/Model/ModelApp';
import Prismatic from './components/Prismatic/PrismaticApp'

class Pages extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Intro}/>
          <Route path='/Home' component={App}/>
          <Route path='/Photos' component={Photos}/>
          <Route path='/Videos' component={Videos}/>
          <Route path='/GestureKeyboard' component={GestureKeyboard}/>
          <Route path='/CandyCrush' component={CandyCrush}/>
          <Route path='/Model' component={Model} />
          <Route path='/Prismatic' component={Prismatic} />
          <Route path='*' component={Intro}/>
        </Switch>
      </Router>
    );
  }
}

export default Pages;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Intro from './components/Intro/Intro';
import App from './App';

class Pages extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Intro}/>
          <Route path='/Intro' component={Intro}/>
          <Route path='/Apps' component={App}/>
          <Route path='*' component={Intro}/>
        </Switch>
      </Router>
    );
  }
}

export default Pages;

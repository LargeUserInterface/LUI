import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Photos from './components/Photos';
import TopBar from './components/TopBar';
import App2 from './components/App2';
import App3 from './components/App3';
import App4 from './components/App4';
import App5 from './components/App5';
import App6 from './components/App6';
import App7 from './components/App7';
import App8 from './components/App8';

const styles = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },

  rowContainer: {
    width: '100%',
    height: '50%',
  },

  appIcon: {

  }

};

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <Grid className={classes.mainContainer} container spacing={24}>

        {/* <Grid className={classes.topBar} item xs={12}>
          <TopBar />
        </Grid> */}

        <Grid className={classes.rowContainer} container>
          <Grid className={classes.appIcon} item xs={4} cl>
            <Photos />
          </Grid>
          <Grid className={classes.appIcon} item xs={4} cl>
            <App2 />
          </Grid>
          <Grid className={classes.appIcon} item xs={4} cl>
            <App3 />
          </Grid>
        </Grid>

        <Grid className={classes.rowContainer} container>
          <Grid className={classes.appIcon} item xs={4} cl>
            <App4 />
          </Grid>
          <Grid className={classes.appIcon} item xs={4} cl>
            <App5 />
          </Grid>
          <Grid className={classes.appIcon} item xs={4} cl>
            <App6 />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);

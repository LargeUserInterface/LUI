import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Photos from './components/Photos';
import TopBar from './components/TopBar';
import Videos from './components/Videos';
import App3 from './components/App3';
import App4 from './components/App4';
import App5 from './components/App5';
import App6 from './components/App6';
import App7 from './components/App7';
import App8 from './components/App8';
import Leap from './leap.js'


const styles = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },

  canvas: {},

  rowContainer: {
    width: '100%',
    height: '50%',
  },
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      main: true,
      current: ""
    };
  }

  componentDidMount() {
    const cards = [this.refs.card1, this.refs.card2, this.refs.card3, this.refs.card4, this.refs.card5, this.refs.card6];
    this.setState({ cards })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Leap className={classes.canvas} cards={this.state.cards} main={this.state.main}> </Leap>

        <Grid className={classes.mainContainer} container spacing={24}>

          <Grid className={classes.rowContainer} container>
            <Grid ref="card1" item xs={4} >
              <Photos />
            </Grid>
            <Grid ref="card2" item xs={4} >
              <App2 />
            </Grid>
            <Grid ref="card3" item xs={4} >
              <App3 />
            </Grid>
          </Grid>

          <Grid className={classes.rowContainer} container>
            <Grid ref="card4" item xs={4} >
              <App4 />
            </Grid>
            <Grid ref="card5" item xs={4} >
              <App5 />
            </Grid>
            <Grid ref="card6" item xs={4} >
              <App6 />
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(App);

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
      hovered: "",
      clicked: ""
    };
  }

  componentDidMount() {
    const cards = [this.refs.card1, this.refs.card2, this.refs.card3, this.refs.card4, this.refs.card5, this.refs.card6];
    this.setState({ cards })
  }

  handleHover = (card) => {
    // console.log("HOVER", card);
    this.setState({hovered: card})
  }

  handleClick = (card) => {
    // console.log("CLICK", card);
    this.setState({
      clicked: card,
      main: false
    })
  }

  handleExit = () => {
    this.setState({
      clicked: "",
      main: true
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Leap 
          cards={this.state.cards} 
          main={this.state.main}
          clicked = {this.state.clicked}
          handleHover = {this.handleHover}
          handleClick = {this.handleClick}
          handleExit = {this.handleExit}
        /> 

        <Grid className={classes.mainContainer} container spacing={24}>

          <Grid className={classes.rowContainer} container>
            <Grid ref="card1" item xs={4} >
              <Photos hovered = {this.state.hovered == "card1"} clicked = {this.state.clicked == "card1"}/>
            </Grid>
            <Grid ref="card2" item xs={4} >
              <App2 hovered = {this.state.hovered == "card2"} clicked = {this.state.clicked == "card2"}/>
            </Grid>
            <Grid ref="card3" item xs={4} >
              <App3 hovered = {this.state.hovered == "card3"} clicked = {this.state.clicked == "card3"}/>
            </Grid>
          </Grid>

          <Grid className={classes.rowContainer} container>
            <Grid ref="card4" item xs={4} >
              <App4 hovered = {this.state.hovered == "card4"} clicked = {this.state.clicked == "card4"}/>
            </Grid>
            <Grid ref="card5" item xs={4} >
              <App5 hovered = {this.state.hovered == "card5"} clicked = {this.state.clicked == "card5"}/>
            </Grid>
            <Grid ref="card6" item xs={4} >
              <App6 hovered = {this.state.hovered == "card6"} clicked = {this.state.clicked == "card6"}/>
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(App);

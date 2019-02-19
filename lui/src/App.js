import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { css } from 'glamor';
import Photos from './components/Photos';
import Videos from './components/Videos';
import Intro from './components/Intro/Intro.jsx';
import Prismatic from './components/Prismatic';
import App4 from './components/App4';
import App5 from './components/App5';
import Leap from './leap.js';
import axios from 'axios';
import request from 'request';
import Model from './components/Model';

// const zoomIn = css.keyframes({
//   '0%': { opacity: 0 },
//   '100%': { opacity: 1 }
// })

const styles = {

  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // animation: `${zoomIn} 2s`
  },

  rowContainer: {
    width: '100%',
    height: '50%',
  }

};

class DelayedComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isMounted && !nextProps.isMounted) { //true -> false
      setTimeout(() => this.setState({ shouldRender: false }), 1000)
    } else if (!this.props.isMounted && nextProps.isMounted) { //false -> true
      this.setState({ shouldRender: true })
    }
  }

  render() {
    return this.state.shouldRender ? <Intro {...this.props} /> : null
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      page: "intro",
      hovered: "",
      clicked: ""
    };
  }

  componentDidMount() {
    const page = localStorage.getItem("page") || "intro";
    const cards = [this.refs.card1, this.refs.card2, this.refs.card3, this.refs.card4, this.refs.card5, this.refs.card6];
    // console.log("PAGE", page);
    this.setState({
      page,
      cards
    })

    // google home
    this.timer = setInterval(() => {
      if (this.state.page === "main") {
        // fetch from firebase
        (async () => {
          let appClicked;
          try {
            const apiResponse = await axios.get('https://luibyobm.firebaseio.com/application.json');
            const response = apiResponse.data;
            if (response.app === "Photos") {
              appClicked = "card1";
            } else if (response.app === "Youtube") {
              appClicked = "card2";
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.handleClick(appClicked);
            this.updateFirebase("None");
          }
        })();
      }
    }, 100);
  }

  updateFirebase = (appToSave) => {
    try {
      const options = {
        method: 'PUT',
        url: 'https://luibyobm.firebaseio.com/application.json',
        headers:
        {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        },
        body: { app: appToSave },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        // console.log(body);
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleHover = (card) => {
    // console.log("HOVER", card);
    this.setState({ hovered: card })

  }

  handleClick = (card) => {
    // console.log("CLICK", card);
    this.setState({ clicked: card })


  }

  handleUnlock = () => {
    // console.log("MAIN");
    this.setState({ page: "main" })
    localStorage.setItem("page", this.state.page);
  }

  handleExit = () => {
    // console.log("Exit");
    this.setState({ page: "intro" })
    localStorage.setItem("page", this.state.page);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Leap
          cards={this.state.cards}
          page={this.state.page}
          clicked={this.state.clicked}
          handleHover={this.handleHover}
          handleClick={this.handleClick}
          handleUnlock={this.handleUnlock}
          handleExit={this.handleExit}
        />

        <Grid className={classes.mainContainer} container>
          <Grid className={classes.rowContainer} container>
            <Grid ref="card1" item xs={4} onClick={() => {this.setState({clicked: "card1"})}} 
            onMouseEnter={() => { this.setState({hovered: "card1"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} >
              <Photos hovered={this.state.hovered === "card1"} clicked={this.state.clicked === "card1"} />
            </Grid>
            <Grid ref="card2" item xs={4} onClick={() => {this.setState({clicked: "card2"})}}
            onMouseEnter={() => { this.setState({hovered: "card2"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} >
              <Videos hovered={this.state.hovered === "card2"} clicked={this.state.clicked === "card2"} />
            </Grid>
            <Grid ref="card3" item xs={4} onClick={() => {this.setState({clicked: "card3"})}}
            onMouseEnter={() => { this.setState({hovered: "card3"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} >
              <Prismatic hovered={this.state.hovered === "card3"} clicked={this.state.clicked === "card3"} />
            </Grid>
          </Grid>

          <Grid className={classes.rowContainer} container>
            <Grid ref="card4" item xs={4} onClick={() => {this.setState({clicked: "card4"})}}
            onMouseEnter={() => { this.setState({hovered: "card4"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} >
              <App4 hovered={this.state.hovered === "card4"} clicked={false} />
            </Grid>
            <Grid ref="card5" item xs={4} onClick={() => {this.setState({clicked: "card5"})}}
            onMouseEnter={() => { this.setState({hovered: "card5"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} >
              <App5 hovered={this.state.hovered === "card5"} clicked={false} />
            </Grid>
            <Grid ref="card6" item xs={4} onClick={() => {this.setState({clicked: "card6"})}}
          onMouseEnter={() => { this.setState({hovered: "card6"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} >
              <Model hovered={this.state.hovered === "card6"} clicked={this.state.clicked === "card6"} />
            </Grid>
          </Grid>
        </Grid>

        <DelayedComponent isMounted={this.state.page === "intro"} page={this.state.page} />

      </div>
    );
  }
}

export default withStyles(styles)(App);

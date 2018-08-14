import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { css } from 'glamor';
import Intro from './components/Intro/Intro.jsx';
import Photos from './components/Photos';
import Videos from './components/Videos';
import App3 from './components/App3';
import App4 from './components/App4';
import App5 from './components/App5';
import App6 from './components/App6';
import Leap from './leap.js'

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
  }

  handleHover = (card) => {
    // console.log("HOVER", card);
    this.setState({ hovered: card })

  }

  handleClick = (card) => {
    // console.log("CLICK", card);
    this.setState({ clicked: card})
  }

  handleUnlock = () => {
    // console.log("MAIN");
    this.setState({ page: "main" })
    localStorage.setItem("page", this.state.page);
  }

  handleExit = () => {
    // console.log("INTRO");
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
            <Grid ref="card1" item xs={4} >
              <Photos hovered={this.state.hovered === "card1"} clicked={this.state.clicked === "card1"} />
            </Grid>
            <Grid ref="card2" item xs={4} >
              <Videos hovered={this.state.hovered === "card2"} clicked={this.state.clicked === "card2"} />
            </Grid>
            <Grid ref="card3" item xs={4} >
              <App3 hovered={this.state.hovered === "card3"} clicked={false} />
            </Grid>
          </Grid>

            <Grid className={classes.rowContainer} container>
              <Grid ref="card4" item xs={4} >
                <App4 hovered={this.state.hovered === "card4"} clicked={false} />
              </Grid>
              <Grid ref="card5" item xs={4} >
                <App5 hovered={this.state.hovered === "card5"} clicked={false} />
              </Grid>
              <Grid ref="card6" item xs={4} >
                <App6 hovered={this.state.hovered === "card6"} clicked={false} />
              </Grid>
            </Grid>
          </Grid>

        <DelayedComponent isMounted={this.state.page === "intro"} page={this.state.page} />

      </div>
    );
  }
}

export default withStyles(styles)(App);

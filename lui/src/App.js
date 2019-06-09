import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { css } from 'glamor';
import glamorous from 'glamorous'
import { Redirect } from 'react-router';
import Photos from './components/Photos';
import Videos from './components/Videos';
import Intro from './components/Intro/Intro.jsx';
import Prismatic from './components/Prismatic/\\';
import CandyCrush from './components/CandyCrush';
import GestureKeyboard from './components/GestureKeyboard';
import Leap from './leap.js';
import axios from 'axios';
import request from 'request';
import Model from './components/Model';
import { I } from 'glamorous';

// const zoomIn = css.keyframes({
//   '0%': { opacity: 0 },
//   '100%': { opacity: 1 }
// })
const zoomIn = css.keyframes({
  '0%': { transform: 'scale(0.5)' },
  '100%': { transform: 'scale(1)' }
})

const styles = {

  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    animation: `${zoomIn} 1s`
  },

  rowContainer: {
    width: '100%',
    height: '50%',
    
  }

};

// class DelayedComponent extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       shouldRender: false
//     }
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   const timeout = 0;
//   //   if (this.props.isMounted && !nextProps.isMounted) { //true -> false
//   //     setTimeout(() => this.setState({ shouldRender: false }), timeout)
//   //   } else if (!this.props.isMounted && nextProps.isMounted) { //false -> true
//   //     this.setState({ shouldRender: true })
//   //   }
//   // }

//   render() {
//     // return this.state.shouldRender ? <Intro {...this.props} /> : null
//     return this.props.page === "intro" ? <Intro {...this.props} /> : null
//   }
// }

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})
const slideOut = css.keyframes({
  '100%': { transform: 'translateY(-100%)' },
})
const Wrapper = glamorous.div(props => ({
  animation: props.exit === true ? `${slideOut} 1s` : props.isMounted ? '' : `${fadeIn} 1.5s`,
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: 5
}))
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      hovered: "",
      clicked: "",
      page: "home"
    };
  }

  componentDidMount() {
    // const page = localStorage.getItem("page") || "main";
    // const page = "intro";
    const cards = [this.refs.card1, this.refs.card2, this.refs.card3, this.refs.card4, this.refs.card5, this.refs.card6];
    this.setState({
      cards,
      exit: false
    })
  

    // google home
    this.timer = setInterval(() => {
      let appClicked;
      axios.get('https://lui-voice.firebaseio.com/voice.json')
        .then(res =>{
          const name = res.data.destination;
          console.log(name);
          if (name === "photos") {
            appClicked = "card1";
          } else if (name === "video") {
            appClicked = "card2";
          } else if (name === "prismatic") {
            appClicked = "card3";
          } else if (name === "game") {
            appClicked = "card4";
          }else if (name === "gesture keyboard") {
            appClicked = "card5";
          } else if (name === "model") {
            appClicked = "card6";
          } 
          this.setState({ clicked: appClicked });
        })}, 1000);
      }
          
          
          
        
     
        // } catch (error) {
        //   console.log(error);
        // } finally {
        //   this.handleClick(appClicked);
          // this.updateFirebase("None");
        //}
   

  // updateFirebase = (appToSave) => {
  //   try {
  //     const options = {
  //       method: 'PUT',
  //       url: 'https://luibyobm.firebaseio.com/application.json',
  //       headers:
  //       {
  //         'Cache-Control': 'no-cache',
  //         'Content-Type': 'application/json'
  //       },
  //       body: { app: appToSave },
  //       json: true
  //     };

  //     request(options, function (error, response, body) {
  //       if (error) throw new Error(error);
  //       // console.log(body);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  handleHover = (card) => {
    // console.log("HOVER", card);
    this.setState({ hovered: card })

  }

  handleClick = (card) => {
    // console.log("CLICK", card);
    this.setState({ clicked: card })
  }

  handleExit = () => {
    console.log("Exit to Intro");
    this.setState({ page: "intro" })
    // localStorage.setItem("page", this.state.page);
  }

  handleUnlock = () => {
    console.log("Unlock to Main");
    this.setState({
      page: "main"
    })
    // localStorage.setItem("page", this.state.page);
  }

  handleSwipeUp = () => {
    this.setState({ exit: true });
    
  }

  render() {
    const { classes } = this.props;

    if (this.state.exit) {
      console.log("EXITING")
      return <Redirect from="/Home" to="/" />
    }

    return (
      <Wrapper isMounted={this.props.isMounted} exit={this.state.exit}>
      <div>
        <Leap
          cards={this.state.cards}
          clicked={this.state.clicked}
          handleHover={this.handleHover}
          handleClick={this.handleClick}
          handleUnlock={this.handleUnlock}
          handleSwipeUp={this.handleSwipeUp}
          page={this.state.page}
        />

        <Grid className={classes.mainContainer} container>
          <Grid className={classes.rowContainer} container>
            <Grid ref="card1" item xs={4} onClick={() => { this.setState({ clicked: "card1" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card1" }) }} onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Photos isMounted = {this.state.clicked === "card1"} hovered={this.state.hovered === "card1"} clicked={this.state.clicked === "card1"} />
            </Grid>
            <Grid ref="card2" item xs={4} onClick={() => { this.setState({ clicked: "card2" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card2" }) }} onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Videos hovered={this.state.hovered === "card2"} clicked={this.state.clicked === "card2"} />
            </Grid>
            <Grid ref="card3" item xs={4} onClick={() => { this.setState({ clicked: "card3" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card3" }) }} onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Prismatic hovered={this.state.hovered === "card3"} clicked={this.state.clicked === "card3"} />
            </Grid>
          </Grid>

          <Grid className={classes.rowContainer} container>
            <Grid ref="card4" item xs={4} onClick={() => { this.setState({ clicked: "card4" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card4" }) }} onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <CandyCrush hovered={this.state.hovered === "card4"} clicked={false} />
            </Grid>
            <Grid ref="card5" item xs={4} onClick={() => { this.setState({ clicked: "card5" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card5" }) }} onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <GestureKeyboard hovered={this.state.hovered === "card5"} clicked={this.state.clicked === "card5"} />
            </Grid>
            <Grid ref="card6" item xs={4} onClick={() => { this.setState({ clicked: "card6" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card6" }) }} onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Model hovered={this.state.hovered === "card6"} clicked={this.state.clicked === "card6"} />
            </Grid>
          </Grid>
        </Grid>

        {/* <Intro page = {this.state.page}/> */}
        {/* <DelayedComponent isMounted={this.state.page === "intro"} page={this.state.page} handleUnlock={this.handleUnlock} /> */}

      </div>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(App);

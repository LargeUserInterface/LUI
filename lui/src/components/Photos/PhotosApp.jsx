import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import glamorous from 'glamorous'
import classNames from 'classnames';
import Leap from './leap.js';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Home from '@material-ui/icons/Home';
import axios from 'axios';

import { css } from 'glamor';
import { Transition } from 'react-transition-group';
import Carousel from 'react-responsive-carousel';
//firebase
import * as firebase from "firebase/app";
import "firebase/database";

const zoomIn = css.keyframes({
  '0%': { transform: 'scale(0.5)' },
  '100%': { transform: 'scale(1)' }
})

const styles = {

  gallery: {
    animation: `${zoomIn} 1s`
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    padding: '0px',
    listStyle: 'none',
    overflow: 'hidden',
    zIndex: '1',
    backgroundColor: '#CFD8DC',
  },

  carousel: {
    // width: '90%',
    maxHeight: '95%',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
  },

  row: {
    maxHeight: '50vh',
  },

  cell: {
    display: 'inline-block',
    maxWidth: '85%',
    maxHeight: '85%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    margin: '0px',
    padding: '3%',
    position: 'relative',
  },

  image: {
    display: 'block',
    maxWidth: '90%',
    maxHeight: '60%',
    width: 'auto',
    height: 'auto',
    margin: 'auto',
    padding: '3%',
    border: 'none',
    transform: 'scale(1)',
    transition: 'all 0.4s',
    boxShadow: '0px 0px 10px 2px #999',
    backgroundColor: "#ECEFF1",
    position: "relative",
    zIndex: '1'
  },

  hovered: {
    transform: 'scale(1.5)',
    animationDuration: '0.1s',
    zIndex: '15 !important'
  },

  zoomed: {
    maxHeight: '80vh'
  },

  // stepper: {
  //   height: '7vh',
  //   margin: '0px',
  //   padding: '0px',
  //   backgroundColor: '#CFD8DC',
  //   position: 'relative',
  //   zIndex: '1'
  // },

  dots: {
    margin: 'auto',
  },

  stepper: {
    // display: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '8em',
    backgroundColor: 'rgb(0,0,0,0)',
    position: "absolute",
    bottom: "1px",
  },

  button: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    color: "rgba(50,50,50,0.8)",
  }
};

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})
const slideOut = css.keyframes({
  '100%': { transform: 'translateY(-100%)' },
})
const Wrapper = glamorous.div(props => ({
  animation: props.isMounted ? `${slideOut} 2.5s` : `${fadeIn} 1.5s`,
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: 5
}))
const photos = ['https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533247094082-709d7257cb7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03d0175eccb69353cf2cc77869902e4f&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533213603451-060f6ec38bfa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d961f9dbe9795f95febb3743a89d14d&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533135347859-2d07f6e8199b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb46a125e61ce38dc70712cefc7cb147&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533071581733-1a1600ec8ac6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a59d7ee412d9efb4818bb4a9ddd55c9&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533213603451-060f6ec38bfa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d961f9dbe9795f95febb3743a89d14d&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533135347859-2d07f6e8199b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb46a125e61ce38dc70712cefc7cb147&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533071581733-1a1600ec8ac6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a59d7ee412d9efb4818bb4a9ddd55c9&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1533247094082-709d7257cb7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03d0175eccb69353cf2cc77869902e4f&auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60']

//firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjM37_DSv2RvPQzl5YiVzmgRHfpd4rJFU",
  authDomain: "lui-medialab.firebaseapp.com",
  databaseURL: "https://lui-medialab.firebaseio.com",
  projectId: "lui-medialab",
  storageBucket: "lui-medialab.appspot.com",
  messagingSenderId: "247289397118",
  appId: "1:247289397118:web:eb2bcb0076d4bb4d"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
var database = firebase.database();
var currentRef = database.ref('voice');
//end
class PhotosApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      hovered: "",
      clicked: -1,
      index: 0,
      exit: false,
      amiclicked:false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
    
    //google home
    currentRef.update({"current":"photos"});
    var something = this;
    currentRef.on('value', function(snapshot) {
      console.log(snapshot.val());
      var db = snapshot.val();
      var name = db.goto;
      if (db.update){
        if (name === "home") {
            something.setState({ exit: true });
            currentRef.update({"update":false});
        }
        
      }
      if(db.clicked){
        currentRef.update({"clicked":false});
        something.gestureDetected = true;
        console.log(db.hovered);
        something.handleClick(db.hovered);
      }
      if (db.back){
        if (something.state.amiclicked){
          something.handleSwipeUp();
        }
        else{
          something.setState({ exit: true });
            
        }
        currentRef.update({"back":false});
      }
    });
  }
  

  getPhotos = () => {
    const photos = [this.refs.photo1, this.refs.photo2, this.refs.photo3, this.refs.photo4,
    this.refs.photo5, this.refs.photo6, this.refs.photo7, this.refs.photo8,
    this.refs.photo9, this.refs.photo10, this.refs.photo11, this.refs.photo12,
    this.refs.photo13, this.refs.photo14, this.refs.photo15, this.refs.photo16
    ];
    this.setState({ photos })
  }

  handleHover = (photo) => {
    this.setState({ hovered: photo })
    currentRef.update({"hovered": photo}); 
  }

  handleClick = (photo) => {
    const index = parseInt(photo.slice(5)) - 1;
    this.setState({ clicked: index })
    this.setState({ amiclicked: true })
  }

  handleExit = () => {
    this.setState({
      exit: true
    })
  }

  handleSwipe = (dir) => {
    let { clicked } = this.state;

    if (dir === "left") {
      console.log("swipe left");
      if (clicked != -1 && clicked < 15) {
        this.setState({ clicked: clicked + 1 })
      } else {
        this.setState({ index: 1 })
      }
    } else {
      console.log("swipe right");
      if (clicked != -1 && clicked > 0) {
        this.setState({ clicked: clicked - 1 })
      } else {
        this.setState({ index: 0 })
      }
    }
  }

  handleNext = () => {
    this.setState(state => ({
      index: 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      index: 0,
    }));
  };

  handleSwipeUp = () => {
    let { clicked } = this.state;
    if (clicked != -1) {
      this.setState({ clicked: -1 });
      this.setState({ amiclicked: false });
      this.getPhotos();
    } else {
      this.setState({ exit: true });
    }
  }

  renderPhoto(index) {
    const { classes } = this.props;
    const { hovered } = this.state;
    const ref = "photo" + String(index + 1);

    return (<Grid item className={classes.cell} ref={ref} xs={12} sm={3}>
      <img
        onMouseEnter={() => { this.setState({hovered: ref}) }}
        onMouseLeave={() => { this.setState({hovered: ""}) }}
        className={hovered === ref ? classNames(classes.image, classes.hovered) : classes.image}
        src={ photos[index] } />
    </Grid>);
  }

  renderFullScreenPhoto(index) {
    const { classes } = this.props;

    return (<div className={classes.carousel} justify={"center"}>
      <Grid container spacing={0} justify={"center"} >
        <Grid item className={classes.cell} xs={12} sm={12}>
          <img
            className={classNames(classes.image, classes.zoomed)}
            src={ photos[index] } />
        </Grid>
      </Grid>
    </div>);
  }

  renderFullScreen(index) {
    const { classes } = this.props;
    console.log(this.state);
    return (<div>
      <SwipeableViews className={classes.gallery} index={index} >
        { this.renderFullScreenPhoto(0) }
        { this.renderFullScreenPhoto(1) }
        { this.renderFullScreenPhoto(2) }
        { this.renderFullScreenPhoto(3) }
        { this.renderFullScreenPhoto(4) }
        { this.renderFullScreenPhoto(5) }
        { this.renderFullScreenPhoto(6) }
        { this.renderFullScreenPhoto(7) }
        { this.renderFullScreenPhoto(8) }
        { this.renderFullScreenPhoto(9) }
        { this.renderFullScreenPhoto(10) }
        { this.renderFullScreenPhoto(11) }
        { this.renderFullScreenPhoto(12) }
        { this.renderFullScreenPhoto(13) }
        { this.renderFullScreenPhoto(14) }
        { this.renderFullScreenPhoto(15) }
      </SwipeableViews>
    </div>);
  }

  renderPhotos() {
    const { classes } = this.props;
    
    return (<div>`
      <div>
        <SwipeableViews className={classes.gallery} index={this.state.index} onTransitionEnd={this.getPhotos}>

          <div className={classes.carousel} justify={"center"}>
            <Grid container className={classes.row} spacing={0} justify={"center"} >
              { this.renderPhoto(0) }
              { this.renderPhoto(1) }
              { this.renderPhoto(2) }
              { this.renderPhoto(3) }
            </Grid>

            <Grid container className={classes.row} spacing={0} justify={"center"}>
              { this.renderPhoto(4) }
              { this.renderPhoto(5) }
              { this.renderPhoto(6) }
              { this.renderPhoto(7) }
            </Grid>
          </div>

          <div className={classes.carousel}>
            <Grid container className={classes.row} spacing={0} justify={"center"} >
              { this.renderPhoto(8) }
              { this.renderPhoto(9) }
              { this.renderPhoto(10) }
              { this.renderPhoto(11) }
            </Grid>

            <Grid container className={classes.row} spacing={0} justify={"center"}>
              { this.renderPhoto(12) }
              { this.renderPhoto(13) }
              { this.renderPhoto(14) }
              { this.renderPhoto(15) }
            </Grid>
          </div>
        </SwipeableViews>
      </div>

      <div className = "stepper">
        <MobileStepper
          variant="dots"
          steps={2}
          position="bottom"
          activeStep={this.state.index}
          className={classes.stepper}
          classes={{ dots: classes.dots }}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={this.state.index === 1}>
              <KeyboardArrowRight />
              {/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.index === 0}>
              {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </div>
    </div>);
  }

  render() {
    const { classes } = this.props;
    const { clicked } = this.state;

    if (this.state.exit) {
      console.log("EXITING")
      return <Redirect to={{ pathname: "/Home", state: {page: "home"} }} />
    }
    console.log(this.state.clicked);

    return (
      <Wrapper isMounted={this.props.isMounted} exit={this.state.exit}>
        <div>
          <div className={classes.container} justify={"center"}>
            <Leap
              photos={this.state.photos}
              handleHover={this.handleHover}
              handleClick={this.handleClick}
              amiclicked = {this.state.amiclicked}
              
              handleSwipe={this.handleSwipe}
              handleSwipeUp={this.handleSwipeUp}
            />

            { clicked != -1 ? this.renderFullScreen(clicked) : this.renderPhotos() }

            <Button onClick={() => this.handleExit()}  className={classes.button}>
              <Home/>
            </Button>

          </div>
          </div>
    </Wrapper>
    );
  }
}

export default withStyles(styles)(PhotosApp);

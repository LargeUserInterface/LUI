import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import Leap from './leap.js'
import { Redirect } from 'react-router';
import glamorous from 'glamorous'
import { css } from 'glamor';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Home from '@material-ui/icons/Home';
//add firebase
import * as firebase from "firebase/app";
import "firebase/database";
import Clear from '@material-ui/icons/Clear';


const zoomIn = css.keyframes({
  '0%': { transform: 'scale(0.5)' },
  '100%': { transform: 'scale(1)' }
})
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

const styles = {

  gallery: {
    animation: `${zoomIn} 0.5s`,
    maxHeight: '95vh', 
  },

  carousel: {
    // width: '90%',
    maxHeight: '95vh',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0)',
  },

  row: {
    height: '30%',
    margin: '2%'
  },

  cell: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    margin: '0px',
    position: 'relative',
  },

  container: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    padding: '0px',
    listStyle: 'none',
    overflow: 'none',
    zIndex: '1',
    backgroundColor: '#ECEFF1',
    overflow: 'hidden',
  },

  frameContainer: {
    display: 'block',
    width: '25vw',
    height: '27vh',
    verticalAlign: 'middle',
    // boxSizing: 'border-box',
    padding: '0px',
    // margin: '1.5vw',
    // transform: 'scale(1)',
    // transition: '200ms',
    // border: '2px solid #37474F',
    boxShadow: '0px 0px 10px 2px #999',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 5
    // pointerEvents: 'none'
  },

  zoomed: {
    width: '100vw',
    height: '93vh',
    // top: '0px',
    // left: '0px',
    // position: 'fixed',
    // zIndex: '100',
  },

  hovered: {
    transform: 'scale(1.15)',
    transition: '200ms ease-out',
    position: 'relative',
    zIndex: 5,
  },

  stepper: {
    // display: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '8em',
    backgroundColor: 'rgba(0,0,0,0)',
    position: "absolute",
    bottom: "1px",
  },

  dots: {
    margin: 'auto',
  },

  button: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    color: "rgba(50,50,50,0.8)",
  },

  xbutton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    color: "rgba(50,50,50,0.8)",
  },

  cover: {
    display: 'block',
    width: '25vw',
    height: '27px',
    // verticalAlign: 'middle',
    // boxSizing: 'border-box',
    padding: '0px',
    // margin: '1.5vw',
    // transform: 'scale(1)',
    // transition: '200ms',
    // border: '2px solid #37474F',
    boxShadow: '0px 0px 10px 2px #999',
    overflow: 'hidden',
    zIndex: 50,
    position: 'absolute',
    pointerEvents: 'none'
  },

  // row: {
  //   pointerEvents: "none"
  // }

};

const videos = [
    {id: 'rnlCGw-0R8g'},
    {id: 'zw47_q9wbBE'},
    {id: '7m6J8W6Ib4w'},
    {id: 'l7uuTnk69Eo'},
    {id: '6ZfuNTqbHE8'},
    {id: '_8w9rOpV3gc'},
    {id: 'c-SE2Qeqj1g'},
    {id: '-AbaV3nrw6E'},
    {id: 'FTPmnZVgDjQ'},
    {id: 'dQw4w9WgXcQ'},
    {id: 'Xnk4seEHmgw'},
    {id: '5G1C3aBY62E'}
]

const opts = {
  height: '350',
  width: '500',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    controls: 0
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


class VideosApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            target_dict: {},
            playing:[],
            zoomed: -1,
            hovered: "",
            index: 0,
            exit: false,
        }
    }

    componentDidMount() {
        console.log("MOUNTED");
        this.getVideos();
        //google home
    currentRef.update({"current":"videos"});
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
      if(db.back){
        something.setState({ exit: true });
        currentRef.update({"back":false});
      }

    });
    //end
    }

    getVideos = () => {
        const videos = [this.refs.video1, this.refs.video2, this.refs.video3,
                       this.refs.video4, this.refs.video5, this.refs.video6,
                       this.refs.video7, this.refs.video8, this.refs.video9,
                       this.refs.video10, this.refs.video11, this.refs.video12];
        this.setState({videos});
    }

    handleHover = (video) => {
        this.setState({hovered:video})
    }

    handleSwipe = (dir) => {
      var { zoomed, videos } = this.state;
      // swipe between zoomed in videos
      if (zoomed != -1) {
        if (dir === "right") {
          zoomed = Math.max(0, zoomed - 1);
        } else {
          zoomed = Math.min(videos.length - 1, zoomed + 1);
        }
        this.setState({ zoomed });
      }
      else {
        if (dir === "left") {
          this.setState({
            index: 1
          })
        } else {
          this.setState({
            index: 0
          })
        }
      }
    }

    handleNext = () => {        //for pointer
      this.setState(state => ({
        index: 1,
      }));
    };

    handleBack = () => {
      this.setState(state => ({
        index: 0,
      }));
    };

    handleExit = () => {
      this.setState({
        exit: true
      })
    }

    handleClick = (video) => {
        try{
            var { playing } = this.state;
            var videoIndex = parseInt(video.slice(5));
            var videoId = videos[videoIndex-1].id;
            console.log("HANDLE CLICK", videoId)
            console.log(playing)
            console.log(playing[videoId])
            if (!this.state.playing[videoId]) {
              console.log("HERE")
                this.state.target_dict[videoId].playVideo();
                console.log("hi")
                playing[videoId] = true;
                console.log("PLAY", videoIndex);
            } else {
              console.log("HERE@")
                this.state.target_dict[videoId].pauseVideo();
                playing[videoId] = false;
                console.log("PAUSE", videoIndex);
            }
            this.setState({ playing });
        } catch (err) { }
    }

    handleZoom = (video) => {
      var { zoomed } = this.state;
      console.log("ZOOMED", video);

      zoomed = parseInt(video.slice(5)) - 1;
      this.setState({ zoomed, hovered: "" });
    }

    // adjust volume
    handleKnob = (video, roll) => {
      var videoIndex = parseInt(video.slice(5));
      var videoId = videos[videoIndex-1].id;
      console.log("HANDLE KNOB", videoId, roll)
      this.state.target_dict[videoId].setVolume(roll);
    }

    handleSwipeUp = () => {
      let { zoomed } = this.state;
      if (zoomed != -1) {
        this.setState({ zoomed: -1 });
        this.getVideos();
      } else {
        this.setState({ exit: true });
      }
    }

    _onReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
      this.setState({playing:[...this.state.playing,false]});
      var new_target_dict = this.state.target_dict;
      new_target_dict[event.target.b.b.videoId] = event.target;
      this.setState({target_dict: new_target_dict});
    }

    getVideoClass(video) {
      const { classes } = this.props;
      const { hovered } = this.state;
      if (hovered === video)
        return classNames(classes.frameContainer, classes.hovered);
      return classes.frameContainer;
    }

    renderVideo(index) {
      const { classes } = this.props;
      const { hovered } = this.state;
      const ref = "video" + String(index + 1);

      return (
        
        <Grid onMouseEnter={() => { this.setState({hovered: ref}) }}
              onMouseLeave={() => { this.setState({hovered: ""}) }}
              onClick={() => { this.handleClick(hovered) }}
              item
              className={classes.cell}
              xs={12} sm={ 4 }>
          <div className="cover">
            <YouTube ref={ref} item
              className={this.getVideoClass(ref)}
              videoId={videos[index].id}
              key={index}
              opts={opts}
              onReady={this._onReady}
              onPause={this._onPause}
            />
          </div>
        </Grid>);
    }

    renderVideos() {
      const { classes } = this.props;

      return (<div>
          <SwipeableViews className={classes.gallery} index={this.state.index} onTransitionEnd={this.getVideos}>
            <div className={classes.carousel}>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                {this.renderVideo(0)}
                {this.renderVideo(1)}
                {this.renderVideo(2)}
              </Grid>
              <Grid container className={classes.row} spacing={0} justify={"center"}>
                {this.renderVideo(3)}
                {this.renderVideo(4)}
                {this.renderVideo(5)}
              </Grid>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                {this.renderVideo(6)}
                {this.renderVideo(7)}
                {this.renderVideo(8)}
              </Grid>
            </div>
            <div className={classes.carousel}>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                {this.renderVideo(9)}
                {this.renderVideo(10)}
                {this.renderVideo(11)}
              </Grid>
            </div>
          </SwipeableViews>
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
      );
    }

    renderFullScreenVideo(index) {
      const { classes } = this.props;

      return (<div className={classes.carousel} justify={"center"}>
        <Grid container spacing={0} justify={"center"} >
          <Grid item
                className={classes.cell}
                xs={12} sm={ 12 }>
            <YouTube item
              className={classNames(classes.frameContainer, classes.zoomed)}
              videoId={videos[index].id}
              key={index}
              opts={opts}
              onReady={this._onReady}
              onPause={this._onPause}
            />
          </Grid>
        </Grid>
      </div>);
    }

    renderFullScreen(index) {
      const { classes } = this.props;

      return (<div>
        <SwipeableViews className={classes.gallery} index={index} onTransitionEnd={this.getVideos}>
          { this.renderFullScreenVideo(0) }
          { this.renderFullScreenVideo(1) }
          { this.renderFullScreenVideo(2) }
          { this.renderFullScreenVideo(3) }
          { this.renderFullScreenVideo(4) }
          { this.renderFullScreenVideo(5) }
          { this.renderFullScreenVideo(6) }
          { this.renderFullScreenVideo(7) }
          { this.renderFullScreenVideo(8) }
          { this.renderFullScreenVideo(9) }
          { this.renderFullScreenVideo(10) }
          { this.renderFullScreenVideo(11) }
        </SwipeableViews>
        <div className = "stepper">
        <MobileStepper
          variant="dots"
          steps={12}
          position="bottom"
          activeStep={index}
          className={classes.stepper}
          classes={{ dots: classes.dots }}
          nextButton={
            <Button size="small" onClick={()=>this.handleSwipe("left")} disabled={index === 11}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={()=>this.handleSwipe("right")} disabled={index === 0}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </div>
      <Button onClick={() => this.handleSwipeUp()}  className={classes.xbutton}>
        <Clear/>
      </Button>
      </div>);
    }

    render() {
        const { classes } = this.props;
        const { zoomed } = this.state;

        if (this.state.exit) {
          return <Redirect to={{ pathname: "/Home", state: {page: "home"} }} />
        }

        return (
          <Wrapper isMounted={this.props.isMounted} exit={this.state.exit}>
            <div className={classes.container}>
              <Leap
                videos={this.state.videos}
                handleHover={this.handleHover}
                handleSwipe={this.handleSwipe}
                handleSwipeUp={this.handleSwipeUp}
                handleClick={this.handleClick}
                handleZoom={this.handleZoom}
                handleKnob={this.handleKnob}
              />

              { zoomed != -1 ? this.renderFullScreen(zoomed) : this.renderVideos() }

              <Button onClick={() => this.handleExit()}  className={classes.button}>
                <Home/>
              </Button>
            </div>
            </Wrapper>
        );
      }
  }

  VideosApp.defaultProps = {
      hovered: false,
      clicked: false,
  };

export default withStyles(styles)(VideosApp);

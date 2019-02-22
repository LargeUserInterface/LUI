import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import Leap from './leap.js'
import { Redirect } from 'react-router';
import { css } from 'glamor';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const zoomIn = css.keyframes({
  '0%': { transform: 'scale(0.5)' },
  '100%': { transform: 'scale(1)' }
})

const styles = {

  gallery: {
    animation: `${zoomIn} 1s`
  },

  carousel: {
    width: '100%',
    height: '90%',
    padding: '0px',
    margin: '0px'
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
  },

  frameContainer: {
    display: 'block',
    width: '25vw',
    height: '27vh',
    verticalAlign: 'middle',
    // boxSizing: 'border-box',
    padding: '0px',
    // margin: '1.5vw',
    transform: 'scale(1)',
    transition: '200ms', 
    // border: '2px solid #37474F',
    boxShadow: '0px 0px 10px 2px #999',
    overflow: 'hidden',
  },

  hovered: {
    transform: 'scale(1.15)',
    transition: '200ms ease-out',
    position: 'relative',
    zIndex: 5,
  },

  zoomed: {
    position: 'fixed', /* Stay in place */
    zIndex: 2, /* Sit on top */
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    animation: `${zoomIn} 200ms`
    // transform: 'scale(3)',
    // animationDuration: '1s',
    // position: 'absolute'
  },

  stepper: {
    height: '9vh',
    margin: '0px',
    padding: '0px',
    backgroundColor: '#ECEFF1',
    zIndex: 1
  },

  dots: {
    margin: 'auto',
  }

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

class VideosApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            target_dict: {},
            playing:[],
            zoomed: "",
            hovered: "",
            index: 0,
            exit: false,
        }
    }

    componentDidMount() {
        console.log("MOUNTED");
        this.getVideos();
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
      if (zoomed) {
        var zoomedIndex = parseInt(zoomed.slice(5));
        if (dir === "right") {
          var newZoomedIndex = Math.max(1, zoomedIndex - 1);
          zoomed = "video" + String(newZoomedIndex);
        } else {
          var newZoomedIndex = Math.min(videos.length, zoomedIndex + 1);
          zoomed = "video" + String(newZoomedIndex);
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

      if (zoomed) { // zoom out
        zoomed = "";
      } else {      // zoom in
        zoomed = video;
      }
      this.setState({ zoomed });
    }

    // adjust volume
    handleKnob = (video, roll) => {
      var videoIndex = parseInt(video.slice(5));
      var videoId = videos[videoIndex-1].id;
      console.log("HANDLE KNOB", videoId, roll)
      this.state.target_dict[videoId].setVolume(roll);
    }

    handleExit = () => {
      console.log("exit");
      this.setState({
        exit: true
      })
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
      const { hovered, zoomed } = this.state;
      if (hovered === video)
        return classNames(classes.frameContainer, classes.hovered);
      return classes.frameContainer;
    }

    renderVideo(index) {
      const { classes } = this.props;
      const ref = "video" + String(index + 1);

      return (
        <Grid onMouseEnter={() => { this.setState({hovered: ref}) }}
              onMouseLeave={() => { this.setState({hovered: ""}) }}
              item
              className={classes.cell}
              xs={12} sm={4}>
          <YouTube ref={ref} item
            className={this.getVideoClass(ref)}
            videoId={videos[index].id}
            key={index}
            opts={opts}
            onReady={this._onReady}
            onPause={this._onPause}
          />
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

    renderZoomed() {
      const { classes } = this.props;
      const { hovered, zoomed } = this.state;

      if (zoomed) {
        var videoIndex = parseInt(zoomed.slice(5));
        var videoId = videos[videoIndex-1].id;
        return (<YouTube item
          className={classNames(classes.zoomed)}
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onPause={this._onPause}
        />);
      }
    }

    render() {
        const { classes } = this.props;

        if (this.state.exit) {
          return <Redirect to={{ pathname: "/Home" }} />
        }

        return (
            <div className={classes.container}>
              <Leap
                videos={this.state.videos}
                handleHover={this.handleHover}
                handleSwipe={this.handleSwipe}
                handleExit={this.handleExit}
                handleClick={this.handleClick}
                handleZoom={this.handleZoom}
                handleKnob={this.handleKnob}
              />
              { this.renderVideos() }
              { this.renderZoomed() }
            </div>
        );
      }
  }

  VideosApp.defaultProps = {
      hovered: false,
      clicked: false,
  };

export default withStyles(styles)(VideosApp);

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
    backgroundColor: '#ECEFF1',
  },

  frameContainer: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    verticalAlign: 'middle',
    // boxSizing: 'border-box',
    padding: '0px',
    margin: 'auto',
    transform: 'scale(1)',
    transition: 'all 1s',
    border: '2px solid #37474F',
    boxShadow: '10px 10px 5px #ccc'
  },

  hovered: {
    transform: 'scale(1.1)',
    animationDuration: '1s'
  },

  zoomed: {
    position: 'fixed', /* Stay in place */
    zIndex: 2, /* Sit on top */
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    animation: `${zoomIn} 1s`
    // transform: 'scale(3)',
    // animationDuration: '1s',
    // position: 'absolute'
  },

  stepper: {
    height: '10%',
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
    {id: 'mFIOGpIQtVU'},
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

    handleClick = (video) => {
        try{
            var videoIndex = parseInt(video.slice(5));
            var videoId = videos[videoIndex-1].id;
            console.log("CLICKED", videoId);
            if (this.state.playing[videoId] == false) {
                this.state.target_dict[videoId].playVideo();
                this.state.playing[videoId] = true;
            } else {
                this.state.target_dict[videoId].pauseVideo();
                this.state.playing[videoId] = false;
            }
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

    renderVideos() {
      const { classes } = this.props;
      const { hovered, zoomed } = this.state;

      return (<div>
          <SwipeableViews className={classes.gallery} index={this.state.index} onTransitionEnd={this.getVideos}>
            <div className={classes.carousel}>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video1" item
                    className={this.getVideoClass("video1")}
                    videoId={videos[0].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video2" item
                    className={this.getVideoClass("video2")}
                    videoId={videos[1].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video3" item
                    className={this.getVideoClass("video3")}
                    videoId={videos[2].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={0} justify={"center"}>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video4" item
                    className={this.getVideoClass("video4")}
                    videoId={videos[3].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video5" item
                    className={this.getVideoClass("video5")}
                    videoId={videos[4].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video6" item
                    className={this.getVideoClass("video6")}
                    videoId={videos[5].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video7" item
                    className={this.getVideoClass("video7")}
                    videoId={videos[6].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video8" item
                    className={this.getVideoClass("video8")}
                    videoId={videos[7].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video9" item
                    className={this.getVideoClass("video9")}
                    videoId={videos[8].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={classes.carousel}>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video10" item
                    className={this.getVideoClass("video10")}
                    videoId={videos[9].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video11" item
                    className={this.getVideoClass("video11")}
                    videoId={videos[10].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid item className={classes.cell} xs={12} sm={4}>
                  <YouTube ref="video12" item
                    className={this.getVideoClass("video12")}
                    videoId={videos[11].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
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
          return <Redirect to={{ pathname: "/" }} />
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

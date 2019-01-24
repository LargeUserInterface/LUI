import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import Leap from './leap.js'
import { Redirect } from 'react-router';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    margin: '0 auto',
    padding: '2px',
    backgroundColor: '#FFF',
    listStyle: 'none',
    overflow: 'visible',
    zIndex: '1',
    backgroundColor: "#ECEFF1"
  },

  frameContainer: {
    display: 'inline-block',
    width: '95%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    padding: '0px',
    margin: '10px',
    position: 'relative',
    border: '0px solid #37474F',
    boxShadow: '0px 0px 10px 2px #999',
  },

  hovered: {
    transform: 'scale(1.15)',
    animationDuration: '3s',
    zIndex: 5,
  },

};

const videos = [
    {id: 'rnlCGw-0R8g'},
    {id: 'zw47_q9wbBE'},
    {id: '7m6J8W6Ib4w'},
    {id: 'l7uuTnk69Eo'},
    {id: '6ZfuNTqbHE8'},
    {id: 'mFIOGpIQtVU'}
    // {id: 'c-SE2Qeqj1g'},
    // {id: '-AbaV3nrw6E'},
    // {id: 'FTPmnZVgDjQ'}
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
            hovered: "",
            clicked: "",
            exit: false,
        }
    }

    componentDidMount() {
        this.getVideos();
    }

    getVideos = () => {
        const videos = [this.refs.video1, this.refs.video2, this.refs.video3,
                       this.refs.video4, this.refs.video5, this.refs.video6];
                       // this.refs.video7, this.refs.video8, this.refs.video9];
        this.setState({videos});
    }

    handleHover = (video) => {
        this.setState({hovered:video})
    }

    handleClick = (video) => {
        try{
            this.setState({clicked:video})
            var videoIndex = parseInt(video.charAt(video.length-1));
            var videoId = videos[videoIndex-1].id
            if (this.state.playing[videoId] == false) {
                this.state.target_dict[videoId].playVideo();
                this.state.playing[videoId] = true;
            } else {
                this.state.target_dict[videoId].pauseVideo();
                this.state.playing[videoId] = false;
            }
        } catch (err) { }
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
      console.log(new_target_dict);
      new_target_dict[event.target.b.b.videoId] = event.target;
      this.setState({target_dict: new_target_dict});
    }


    render() {
        const { classes } = this.props;
        const { hovered } = this.state;
        const { clicked } = this.state;

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
              />
              <div>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid onMouseEnter={() => { this.setState({hovered: "video1"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} item className={classes.cell} ref="video1" xs={12} sm={4} >
                  <YouTube ref="video1" 
                    className={hovered === "video1" ? classNames(classes.frameContainer,classes.hovered): classes.frameContainer}
                    videoId={videos[0].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid onMouseEnter={() => { this.setState({hovered: "video2"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} item className={classes.cell} ref="video2" xs={12} sm={4} >
                  <YouTube ref="video2"
                    className={hovered === "video2" ? classNames(classes.frameContainer,classes.hovered): classes.frameContainer}
                    videoId={videos[1].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid onMouseEnter={() => { this.setState({hovered: "video3"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} item className={classes.cell} ref="video3" xs={12} sm={4} >
                  <YouTube ref="video3"
                    className={hovered === "video3" ? classNames(classes.frameContainer,classes.hovered): classes.frameContainer}
                    videoId={videos[2].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid onMouseEnter={() => { this.setState({hovered: "video4"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} item className={classes.cell} ref="video4" xs={12} sm={4} >
                  <YouTube ref="video4"
                    className={hovered === "video4" ? classNames(classes.frameContainer,classes.hovered): classes.frameContainer}
                    videoId={videos[3].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid onMouseEnter={() => { this.setState({hovered: "video5"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} item className={classes.cell} ref="video5" xs={12} sm={4} >
                  <YouTube ref="video5"
                    className={hovered === "video5" ? classNames(classes.frameContainer,classes.hovered): classes.frameContainer}
                    videoId={videos[4].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
                <Grid onMouseEnter={() => { this.setState({hovered: "video6"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} item className={classes.cell} ref="video6" xs={12} sm={4} >
                  <YouTube ref="video6"
                    className={hovered === "video6" ? classNames(classes.frameContainer,classes.hovered): classes.frameContainer}
                    videoId={videos[5].id}
                    opts={opts}
                    onReady={this._onReady}
                    onPause={this._onPause}
                  />
                </Grid>
              </Grid>
              </div>
            </div>
        );
      }
  }

  VideosApp.defaultProps = {
      hovered: false,
      clicked: false,
  };

export default withStyles(styles)(VideosApp);

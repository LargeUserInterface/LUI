import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
    zIndex: '1'
  },

  frameContainer: {
    display: 'inline-block',
    width: '33.3%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    padding: '0px',
    position: 'relative',
    border: '2px solid #37474F',
    '&:hover': {
      transform: 'scale(1.1)',
      animationDuration: '2s'
    }
  },
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
    {id: 'FTPmnZVgDjQ'}
]

const opts = {
  height: '315',
  width: '560',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0
  }
};

class VideosApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
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
                       this.refs.video4, this.refs.video5, this.refs.video6,
                       this.refs.video7, this.refs.video8, this.refs.video9];
        this.setState({videos});
    }

    handleHover = (video) => {
        this.setState({hovered:video})
    }

    handleClick = (video) => {
        this.setState({clicked:video})
        // this.refs.video1.playVideo();
    }

    handleExit = () => {
      console.log("exit");
      this.setState({
        exit: true
      })
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
                  <YouTube ref="video1" item className = {classes.frameContainer}
                    videoId={videos[0].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video1"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video2" item className = {classes.frameContainer}
                    videoId={videos[1].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video2"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video3" item className = {classes.frameContainer}
                    videoId={videos[2].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video3"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video4" item className = {classes.frameContainer}
                    videoId={videos[3].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video4"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video5" item className = {classes.frameContainer}
                    videoId={videos[4].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video5"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video6" item className = {classes.frameContainer}
                    videoId={videos[5].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video6"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video7" item className = {classes.frameContainer}
                    videoId={videos[6].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video7"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video8" item className = {classes.frameContainer}
                    videoId={videos[7].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video8"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
                  <YouTube ref="video9" item className = {classes.frameContainer}
                    videoId={videos[8].id}
                    opts={opts}
                    onReady={this._onReady}
                    // clicked={this.state.clicked === "video9"}
                    onStateChange={this._onStateChange}
                    onPause={this._onPause}
                  />
              </div>
            </div>
        );
      }

      _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.playVideo();
        // console.log(event.data)
      }

      _onPause(event) {
          console.log(event.data);
      }

      _onStateChange(event) {
          console.log("Event",event);
          console.log("Clicked", this.state.clicked)
          if (event.data == -1) {
              event.target.pauseVideo();
          }
      }
  }

  VideosApp.defaultProps = {
      hovered: false,
      clicked: false
  };

export default withStyles(styles)(VideosApp);

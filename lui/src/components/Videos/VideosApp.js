import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';


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
    }

//     render() {
//         return (
//             <iframe id={video1.id}
//                     width={video1.width} height={video1.height}
//                     frameborder={video1.frameborder}
//                     style={video1.style}
//             ></iframe>
//         )
//         var tag = document.createElement('script');
//         tag.id = 'iframe-demo';
//         tag.src = 'https://www.youtube.com/iframe_api';
//         var firstScriptTag = document.getElementsByTagName('script')[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
//         var player;
//         function onYouTubeIframeAPIReady() {
//             player = new YT.Player('existing-iframe-example', {
//                 events: {
//                   'onReady': onPlayerReady,
//                   'onStateChange': onPlayerStateChange
//                 }
//             });
//         }
//         function onPlayerReady(event) {
//             document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
//         }
//         function changeBorderColor(playerStatus) {
//             var color;
//             if (playerStatus == -1) {
//               color = "#37474F"; // unstarted = gray
//             } else if (playerStatus == 0) {
//               color = "#FFFF00"; // ended = yellow
//             } else if (playerStatus == 1) {
//               color = "#33691E"; // playing = green
//             } else if (playerStatus == 2) {
//               color = "#DD2C00"; // paused = red
//             } else if (playerStatus == 3) {
//               color = "#AA00FF"; // buffering = purple
//             } else if (playerStatus == 5) {
//               color = "#FF6DOO"; // video cued = orange
//             }
//             if (color) {
//               document.getElementById('existing-iframe-example').style.borderColor = color;
//             }
//         }
//         function onPlayerStateChange(event) {
//             changeBorderColor(event.data);
//         }
//     }
// }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
              <YouTube className = {classes.frameContainer}
                videoId={videos[0].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[1].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[2].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[3].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[4].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[5].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[6].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[7].id}
                opts={opts}
                onReady={this._onReady}
              />
              <YouTube className = {classes.frameContainer}
                videoId={videos[8].id}
                opts={opts}
                onReady={this._onReady}
              />

            </div>
        );
      }

      _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
  }

export default withStyles(styles)(VideosApp);

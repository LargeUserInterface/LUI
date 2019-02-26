import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import Immutable from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import LeapMotion from 'leapjs';
import TraceSVG from './TraceSVG';
import firebase from 'firebase';
import axios from 'axios';
import request from 'request';

// const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];
const fingers = ["#9bcfed", "#FFF", "#80DEEA", "#4DD0E1", "#26C6DA"];

const styles = {
  body: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
  },

  canvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 10
  },

  traceSVG: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 10,
  },

  classification: {
    margin: '5%',
    height: '20%',
    width: '100%',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'row'
  },

  label: {
    color: '#FFF',
    fontSize: '50px',
    fontWeight: 'bold',
    padding: '10px'
  },

  content: {
    color: '#FFF',
    fontSize: '50px',
    padding: '10px'
  }

};

const config = {
  apiKey: "AIzaSyDuiOnplJjjoh9poil-h67uFPUBw7ojJ0c",
  authDomain: "gesturekeyboard.firebaseapp.com",
  databaseURL: "https://gesturekeyboard.firebaseio.com",
  storageBucket: "gs://gesturekeyboard.appspot.com",
};
firebase.initializeApp(config);

class GestureKeyboardApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frame: "",
      hand: "",
      indexFinger: "",
      trace: new Immutable.List(),
      tracing: false,
      name: 1,
      img: "",
      classified: "",
      queue: ""
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", (ev) => this.handleKeydown(ev));

    // Collect data from Leap Motion at each frame
    this.leap = LeapMotion.loop((frame) => {
      this.setState({
        frame, // update the frame information
        hand: frame.hands.length > 0 ? frame.hands[0] : ""
      });
      this.traceFingers(frame); // visualize the current location of the finger on the screen
    });

    this.timer = setInterval(() => {
      // fetch classification result from firebase
      (async () => {
        try {
          // console.log("QUEUE", typeof this.state.queue, this.state.queue != "");
          if (this.state.queue) {
            const key = this.state.queue;
            const apiResponse = await axios.get('https://gesturekeyboard.firebaseio.com/Data.json');
            const keyData = apiResponse.data[key];

            if (keyData && keyData.classification) { // if new classificaiton result present 
              const classLabel = keyData.classification.toUpperCase();
              this.updateClassified(classLabel);
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();

      // check for unlocking motion
      if (this.state.hand) {
        // console.log("here", this.state.hand.palmVelocity[1] > 400);
        if (this.state.hand.palmVelocity[1] > 400) {
          console.log("Exit Gesture Keyboard");
          this.setState({
            exit: true
          })
        }
      }

    }, 100);


  }

  componentWillUnmount() {
    document.removeEventListener("keydown", (ev) => this.handleKeydown(ev));
    clearInterval(this.timer);
    this.leap.disconnect();
  }

  // upate the classified text to include the latest classification result
  updateClassified = (label) => {
    this.setState(prevState => ({
      classified: prevState.classified + label,
      queue: ""
    }))
  }

  traceFingers(frame) {
    try {
      const canvas = this.refs.canvas;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (this.state.hand) {
        this.state.hand.pointables.forEach((pointable) => {
          if (pointable.type === 1) {
            const color = fingers[pointable.type];
            const position = pointable.stabilizedTipPosition;
            const normalized = frame.interactionBox.normalizePoint(position);
            const x = ctx.canvas.width * normalized[0];
            const y = ctx.canvas.height * (1 - normalized[1]);
            const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
            const point = new Immutable.Map({ x, y })

            if (this.state.tracing) {
              this.setState(prevState => ({
                // trace: prevState.trace.push(point),
                trace: prevState.trace.updateIn([prevState.trace.size - 1], line => line.push(point)),
                indexFinger: point
              }))
              // this.traceStroke(this.state.trace);
            } else {
              this.setState({
                indexFinger: point
              })
              this.drawCircle([x, y], radius, color, pointable.type === 1);
            }
          } else {
            const color = fingers[pointable.type];
            const position = pointable.stabilizedTipPosition;
            const normalized = frame.interactionBox.normalizePoint(position);
            const x = ctx.canvas.width * normalized[0];
            const y = ctx.canvas.height * (1 - normalized[1]);
            const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
            this.drawCircle([x, y], radius, color, pointable.type === 1);
          }
        });
      }
    }
    catch (err) {
      console.log("ERR", err);
    }
  }

  drawCircle(center, radius, color, fill) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.lineWidth = 10;
    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }

  traceStroke(toTrace) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const cp1x = toTrace[Math.floor(toTrace.length / 3)].x;
    const cp1y = toTrace[Math.floor(toTrace.length / 3)].y;
    const cp2x = toTrace[Math.floor(2 * toTrace.length / 3)].x;
    const cp2y = toTrace[Math.floor(2 * toTrace.length / 3)].y;
    const x = toTrace[toTrace.length - 1].x;
    const y = toTrace[toTrace.length - 1].y;

    ctx.beginPath();
    ctx.moveTo(toTrace[0].center[0], toTrace[0].center[1]);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.strokeStyle = "#B2EBF2";
    ctx.lineWidth = 80;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  handleKeydown = (ev) => {
    if (ev.code === "Space") {
      this.handleSwitch();
    }
  }

  handleSwitch = () => {
    if (this.state.tracing) {
      // console.log("STOP TRACKING");

      // export the current trace as image
      const svg = document.getElementById("svg");
      const svgData = (new XMLSerializer()).serializeToString(svg);
      var svgSize = svg.getBoundingClientRect();

      var canvas = document.createElement("canvas");
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;
      var ctx = canvas.getContext("2d");

      var img = document.createElement("img");
      const key = this.state.name;
      const imgname = key + ".png";
      img.name = imgname;
      img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

      img.onload = function () {
        // draw image
        ctx.drawImage(img, 0, 0);
        const imgsrc = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = "trace.png";
        a.href = imgsrc;
        a.click();

        // update database
        try {
          const options = {
            method: 'PUT',
            url: 'https://gesturekeyboard.firebaseio.com/Data/' + key + '.json',
            headers:
            {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json'
            },
            body: { imgname, imgsrc },
            json: true
          };

          request(options, function (error, response, body) {
            if (error) throw new Error(error);
            // console.log(body);
          });

        } catch (e) {
          console.log(e);
        }
      };

      // reset state
      this.setState(prevState => ({
        // trace: new Immutable.List(),
        tracing: false,
        queue: key,
        name: prevState.name + 1
      }))

    } else {
      console.log("START TRACKING");
      this.setState(prevState => ({
        trace: prevState.trace.push(new Immutable.List([this.state.indexFinger])),
        tracing: true
      }))
    }
  };

  render() {
    const { classes } = this.props;

    if (this.state.exit) {
      return <Redirect to={{ pathname: "/" }} />
    }

    return (
      <div className={classes.body}>
        <canvas ref="canvas" className={classes.canvas} ></canvas>
        <TraceSVG className={classes.traceSVG} trace={this.state.trace} />
        <div className={classes.classification} >
          <div className={classes.label}>Classified: </div>
          <div className={classes.content}>{this.state.classified}</div>
        </div>
      </div>
    )
  }
}

GestureKeyboardApp.propTypes = {

};

GestureKeyboardApp.defaultProps = {

};

export default withStyles(styles)(GestureKeyboardApp);

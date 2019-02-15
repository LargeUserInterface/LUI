import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import LeapMotion from 'leapjs';

const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];

const videoSizeOffset = 100;

const styles = {
    canvas: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 100
    }
};

class Leap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            frame: {},
            rightHand: "",
            leftHand: "",
            indexFinger: "",
            thumb: "",
            spread: "",
            zoomed: "",
            hovered: "",
            pinch: "",
            clicked:""
        }
    }

    componentDidMount() {
        console.log("Videos leap is mounted")
        this.leap = LeapMotion.loop((frame) => {
            let hands = frame.hands;
            let rightHand = "";
            let leftHand = "";
            for (const hand of hands) {
                if (hand.type === "left") {
                    leftHand = hand;
                } else {
                    rightHand = hand;
                }
            }
            this.setState({
                frame,
                rightHand,
                leftHand
            });
            this.traceFingers(frame);
        });

        this.timer = setInterval(() => {

            if (this.state.rightHand) {
                var { spread, zoomed, hovered, indexFinger, thumb, rightHand, pinch } = this.state;

                // swiping
                const palmVelocity = rightHand.palmVelocity[0];
                if (palmVelocity < -400) {
                    this.props.handleSwipe("left");
                    return;
                } else if (palmVelocity > 400) {
                    this.props.handleSwipe("right");
                    return;
                }

                // hovering
                const hovered = this.checkHover();
                this.setState({ hovered });
                this.props.handleHover(hovered);

                // clicking
                if (indexFinger.vel[2] < -300 && (hovered || zoomed)) {
                    console.log("CLICKED", hovered);
                    const clicked = hovered ? hovered : zoomed;
                    this.setState({ clicked })
                    this.props.handleClick(clicked);
                    return;
                }

                // zooming
                const spreadX = indexFinger.x - thumb.x;
                const spreadY = indexFinger.y - thumb.y;
                const newSpread = Math.sqrt(spreadX**2 + spreadY**2);
                const xdelt = indexFinger.vel[0] - thumb.vel[0];
                const ydelt = indexFinger.vel[1] - thumb.vel[1];
                const zdelt = indexFinger.vel[2] - thumb.vel[2];
                const deltVel = Math.sqrt(xdelt**2 + ydelt**2 + zdelt**2);
                // zooming in
                if (!zoomed && hovered && pinch > 0.7 && rightHand.pinchStrength < 0.3) {//(!zoomed && hovered && deltVel > 300 && newSpread - spread > 100) {
                  console.log("ZOOM", pinch);
                  this.props.handleZoom(hovered);
                  zoomed = hovered;
                }
                // zooming out - swipe up
                else if (zoomed && rightHand.palmVelocity[1] > 400) {
                  this.props.handleZoom("");
                  zoomed = "";
                }
                this.setState({ zoomed, spread: newSpread });

                // exiting
                if (!zoomed && rightHand.palmVelocity[1] > 400) {
                    this.props.handleExit();
                } else {
                    this.setState({ pinch: rightHand.pinchStrength })
                }
            }

            if (this.state.leftHand) {
                let { leftHand, hovered, zoomed } = this.state;

                // volume control
                if (leftHand) {
                    const roll = this.rollToVolume(leftHand.roll());
                    console.log(roll);
                    if (zoomed)
                        this.props.handleKnob(zoomed, roll);
                }
            }
        }, 100);
    }

    getMagnitude(velocity) {
      const x = velocity[0];
      const y = velocity[1];
      const z = velocity[2];
      return Math.sqrt(x**2 + y**2 + z**2);
    }

    componentWillUnmount() {
        console.log("Videos leap is unmounted")
        clearInterval(this.timer);
        this.leap.disconnect();
    }

    traceFingers(frame) {
        try {
            // TODO: make canvas and ctx global
            const canvas = this.refs.canvas;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { rightHand, leftHand } = this.state;

            if (rightHand) {
                rightHand.fingers.forEach((pointable) => {
                    const color = fingers[pointable.type];
                    const position = pointable.stabilizedTipPosition;
                    const normalized = frame.interactionBox.normalizePoint(position);
                    const x = ctx.canvas.width * normalized[0];
                    const y = ctx.canvas.height * (1 - normalized[1]);
                    const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
                    this.drawCircle([x, y], radius, color, pointable.type === 1);

                    if (pointable.type === 0) {
                        this.setState({
                            thumb: { x, y, vel: pointable.tipVelocity }
                        })
                    }
                    if (pointable.type === 1) {
                        this.setState({
                            indexFinger: { x, y, vel: pointable.tipVelocity }
                        })
                    }
                });
            }
            if (leftHand) {
                const color = "#888888";
                const position = leftHand.stabilizedPalmPosition;
                const normalized = frame.interactionBox.normalizePoint(position);
                const x = ctx.canvas.width * normalized[0];
                const y = ctx.canvas.height * (1 - normalized[1]);
                this.drawCircle([x, y], 75, color, true);
                this.drawArc([x, y], 90, color, this.rollToVolume(leftHand.roll()) / 100);

                this.setState({ leftPalm: { x, y }});
            }
        } catch (err) { }
    }

    clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }

    rollToVolume(roll) {
        return this.clamp(2 - roll, 0, 3) * 100 / 3;
    }

    drawArc(center, radius, color, percent) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(center[0], center[1], radius, 0, percent * 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = color;
        ctx.stroke();
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

    checkHover() {
        const videos = this.props.videos;
        const { x, y } = this.state.indexFinger;
        // don't check for hovering while zoomed in
        if (!this.state.zoomed) {
          for (let i = 0; i < videos.length; i++) {
              if (videos[i]){
                  const videoNode = ReactDOM.findDOMNode(videos[i]);
                  const dims = videoNode.getBoundingClientRect();
                  if (x > dims.left && x < dims.right &&
                      y > dims.top - videoSizeOffset && y < dims.bottom + videoSizeOffset) {
                      // console.log("HOVER", String(i + 1));
                      // console.log(videos[i].props);
                      return ("video" + String(i + 1));
                  }
              }
          }
        }
        // console.log("HOVER NONE");
        return ("");
    }

    render() {
        const { classes } = this.props;

        return (
            <canvas className={classes.canvas} ref="canvas"></canvas>
        )
    }
}


Leap.propTypes = {
    videos: PropTypes.array,
    handleHover: PropTypes.func,
    handleSwipe: PropTypes.func,
    handleExit: PropTypes.func,
    handleClick: PropTypes.func
};

// TODO: better default values
Leap.defaultProps = {
    videos: [],
};

export default withStyles(styles)(Leap);

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
            hand: "",
            indexFinger: "",
            thumb: "",
            spread: "",
            zoomed: false,
            hovered: "",
            pinch: "",
            clicked:""
        }
    }

    componentDidMount() {
        console.log("Videos leap is mounted")
        this.leap = LeapMotion.loop((frame) => {
            this.setState({
                frame,
                hand: frame.hands.length > 0 ? frame.hands[0] : ""
            });
            this.traceFingers(frame);
        });

        this.timer = setInterval(() => {

            if (this.state.hand) {

                // swiping
                const palmVelocity = this.state.hand.palmVelocity[0];
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
                if (this.state.indexFinger.vel[2] < -300 && this.state.hovered) {
                    console.log("CLICKED", this.state.hovered);
                    this.setState({ clicked: this.state.hovered })
                    this.props.handleClick(this.state.hovered);
                    return;
                }

                // zooming
                var { spread, zoomed, hovered } = this.state;
                const spreadX = this.state.indexFinger.x - this.state.thumb.x;
                const spreadY = this.state.indexFinger.y - this.state.thumb.y;
                const newSpread = Math.sqrt(spreadX**2 + spreadY**2);
                const xdelt = this.state.indexFinger.vel[0] - this.state.thumb.vel[0];
                const ydelt = this.state.indexFinger.vel[1] - this.state.thumb.vel[1];
                const zdelt = this.state.indexFinger.vel[2] - this.state.thumb.vel[2];
                const deltVel = Math.sqrt(xdelt**2 + ydelt**2 + zdelt**2);
                // console.log("SPREAD", newSpread);
                // zooming in
                if (!zoomed && hovered && deltVel > 200 && newSpread > 300) {
                  this.props.handleZoom(hovered);
                  zoomed = true;
                } else if (zoomed && deltVel > 200 && newSpread < 100) {
                  this.props.handleZoom("");
                  zoomed = false;
                }
                this.setState({ zoomed, spread: newSpread });

                // exiting
                if (this.state.pinch > 0.7 && this.state.hand.pinchStrength < 0.3) {
                    // this.props.handleExit();
                } else {
                    this.setState({ pinch: this.state.hand.pinchStrength })
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

            frame.pointables.forEach((pointable) => {
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
        } catch (err) { }
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
                  const dims = ReactDOM.findDOMNode(videos[i]).getBoundingClientRect();
                  if (x > dims.left && x < dims.right &&
                      y > dims.top - videoSizeOffset && y < dims.bottom + videoSizeOffset) {
                      console.log("HOVER", String(i + 1))
                      return ("video" + String(i + 1));
                  }
              }
          }
        }
        console.log("HOVER NONE");
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

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import LeapMotion from 'leapjs';

const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];
const left_fingers = ["#d39bed", "#e1b1f1", "#ca80ea", "#b74ce1", "#a425da"];
const paused_fingers = ["#9bed9b", "#b1f0b1", "#80ea80", "#4ce14c", "#25da25"];

const styles = {
    canvas: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
        pointerEvents: 'none',
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
            hovered: "",
            clicked: "",
            amiclicked:"",
            pinch: "",
            pause: 4
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ amiclicked: nextProps.amiclicked });  
      }

    componentDidMount() {
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

            if (this.state.pause > 0) {
                this.setState({ pause: this.state.pause - 1 });
            }

            if (this.state.rightHand) {
                var { rightHand, indexFinger, clicked, hovered, pause } = this.state;

                // CONTINUOUS GESTURES

                if (!clicked&&!this.state.amiclicked) {
                  hovered = this.checkHover();
                  this.setState({ hovered });
                  this.props.handleHover(hovered);
                }

                // DISCRETE GESTURES

                let gestureDetected = false;

                if (pause === 0) {
                    // swipe left
                    if (rightHand.palmVelocity[0] < -400) {
                        this.props.handleSwipe("left");
                        gestureDetected = true;
                    }

                    // swipe right
                    else if (rightHand.palmVelocity[0] > 400) {
                        this.props.handleSwipe("right");
                        gestureDetected = true;
                    }

                    // swipe up
                    else if (rightHand.palmVelocity[1] > 400) {
                        if (clicked) {
                          clicked = "";
                          this.setState({ clicked });
                          
                        }
                        this.props.handleSwipeUp();
                        gestureDetected = true;
                    }

                    // bloom
                    // if (!zoomed && hovered && pinch > 0.7 && rightHand.pinchStrength < 0.3) {
                    //     this.props.handleBloom();
                    //     gestureDetected = true;
                    // }

                    // airtap
                    if (hovered && indexFinger.vel < -300) {
                        console.log("CLICK")
                        const clicked = hovered
                        this.props.handleClick(clicked);
                        this.setState({ clicked: clicked, hovered: "" });
                        gestureDetected = true;
                    }
                }

                // pause if gesture detected
                if (gestureDetected) {
                  this.setState({ pause: 4 });
                }
            }

            if (this.state.leftHand) {
                let { leftHand } = this.state;

                // knob
                // if (leftHand) {
                //     const roll = this.rollToVolume(leftHand.roll());
                //     if (zoomed)
                //         this.props.handleKnob(zoomed, roll);
                // }
            }

        }, 100);
    }

    componentWillUnmount() {
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

            const { rightHand, leftHand, pause } = this.state;

            if (rightHand) {
                rightHand.fingers.forEach((pointable) => {
                    const color = pause > 0 ? paused_fingers[pointable.type] : fingers[pointable.type];
                    const position = pointable.stabilizedTipPosition;
                    const normalized = frame.interactionBox.normalizePoint(position);
                    const x = ctx.canvas.width * normalized[0];
                    const y = ctx.canvas.height * (1 - normalized[1]);
                    const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
                    this.drawCircle([x, y], radius, color, pointable.type === 1);
                    if (pointable.type == 1) {
                        this.setState({
                            indexFinger: { x, y, vel: pointable.tipVelocity[2] }
                        })
                    }
                });
            }
            if (leftHand) {
              leftHand.fingers.forEach((pointable) => {
                  const color = pause > 0 ? paused_fingers[pointable.type] : left_fingers[pointable.type];
                  const position = pointable.stabilizedTipPosition;
                  const normalized = frame.interactionBox.normalizePoint(position);
                  const x = ctx.canvas.width * normalized[0];
                  const y = ctx.canvas.height * (1 - normalized[1]);
                  const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
                  this.drawCircle([x, y], radius, color, pointable.type === 1);
              });
            }

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
        const photos = this.props.photos;
        const { x, y } = this.state.indexFinger;
        for (let i = 0; i < photos.length; i++) {
            if (photos[i]){
                const dims = ReactDOM.findDOMNode(photos[i]).getBoundingClientRect();
                if (x > dims.left && x < dims.right &&
                    y > dims.top && y < dims.bottom) {
                    return ("photo" + String(i + 1));
                }
            }
        }
        return ("");
    }

    render() {
        console.log(this.state.amiclicked);

        const { classes } = this.props;

        return (
            <canvas className={classes.canvas} ref="canvas"></canvas>
        )
    }
}


Leap.propTypes = {
    photos: PropTypes.array,
    handleHover: PropTypes.func,
    handleSwipe: PropTypes.func,
    handleExit: PropTypes.func
};

// TODO: better default values
Leap.defaultProps = {
    photos: [],
};

export default withStyles(styles)(Leap);

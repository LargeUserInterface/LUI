import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import LeapMotion from 'leapjs';

// const canvas = this.refs.canvas;
// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;
// const ctx = canvas.getContext("2d");
const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];
const paused_fingers = ["#9bed9b", "#b1f0b1", "#80ea80", "#4ce14c", "#25da25"];

const styles = {
    canvas: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
        pointerEvents: 'none'
    }

};

class Leap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            frame: {},
            rightHand: "",
            thumb: "",
            indexFinger: "",
            hovered: "",
            clicked: "",
            pinch: "",
            pause: 10
        }
    }

    componentDidMount() {

        this.leap = LeapMotion.loop((frame) => {
            let hands = frame.hands;
            let rightHand = "";
            for (const hand of hands) {
                if (hand.type === "right") {
                    rightHand = hand;
                }
            }
            this.setState({
                frame,
                rightHand
            });
            this.traceFingers(frame);
        });

        this.timer = setInterval(() => {

            if (this.state.pause > 0) {
                this.setState({ pause: this.state.pause - 1 });
            }

            var { indexFinger, hovered, rightHand, pinch, pause } = this.state;
            let gestureDetected = false;
            
            if (this.props.page == "main") {

                // CONTINUOUS GESTURES

                // hovering
                const hovered = this.checkHover();
                this.setState({ hovered });
                this.props.handleHover(hovered);

                // DISCRETE GESTURES

                if (pause === 0) {
                    // airtap
                    if (indexFinger) {
                        if (indexFinger.velz < -300 && hovered) {
                          this.setState({ clicked: hovered })
                          this.props.handleClick(hovered);
                          gestureDetected = true;
                        }
                    }

                    // bloom
                    if (rightHand) {
                        if (this.state.pinch > 0.9 && rightHand.pinchStrength < 0.1) {
                          this.setState({ pinch: "" });
                          this.props.handleExit();
                          gestureDetected = true;
                        }
                    }
                }

            } else {
                if (rightHand) {
                    if (pause === 0 && rightHand.palmVelocity[1] > 300) {
                        console.log("Unlock Intro");
                        this.props.handleUnlock();
                        gestureDetected = true;
                    }
                }
            }

            // update pinch
            this.setState({ pinch: rightHand.pinchStrength })

            // pause if gesture detected
            if (gestureDetected) {
                this.setState({ pause: 10 });
            }

        }, 10);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
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
            const { rightHand, pause } = this.state;

            if (rightHand) {
                rightHand.fingers.forEach((pointable) => {
                    const color = pause > 0 ? paused_fingers[pointable.type] : fingers[pointable.type];
                    const position = pointable.stabilizedTipPosition;
                    const normalized = frame.interactionBox.normalizePoint(position);
                    const x = ctx.canvas.width * normalized[0];
                    const y = ctx.canvas.height * (1 - normalized[1]);
                    const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
                    this.drawCircle([x, y], radius, color, pointable.type === 1);

                    if (pointable.type === 0) {
                        this.setState({
                            thumb: { x, y }
                        })
                    }

                    if (pointable.type === 1) {
                        this.setState({
                            indexFinger: {
                              x,
                              y,
                              vely: pointable.tipVelocity[1],
                              velz: pointable.tipVelocity[2]
                            }
                        })
                    }
                });
            }
        } catch (err) {
            // console.log("ERR", err);
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

    checkHover() {
        // calculate location of cards
        const cards = this.props.cards;
        const { x, y } = this.state.indexFinger;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i]) {
                const dims = ReactDOM.findDOMNode(cards[i]).getBoundingClientRect();
                if (x > dims.left && x < dims.right &&
                    y > dims.top && y < dims.bottom) {
                    return ("card" + String(i + 1));
                }
            }
        }
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
    cards: PropTypes.array,
    handleHover: PropTypes.func,
    handleClick: PropTypes.func,
    handleExit: PropTypes.func
};

// TODO: better default values
Leap.defaultProps = {

};

export default withStyles(styles)(Leap);

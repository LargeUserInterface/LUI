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
            hand: "",
            thumb: "",
            indexFinger: "",
            hovered: "",
            clicked: "",
            pinch: ""
        }
    }

    componentDidMount() {

        this.leap = LeapMotion.loop((frame) => {
            this.setState({
                frame,
                hand: frame.hands.length > 0 ? frame.hands[0] : ""
            });
            this.traceFingers(frame);
        });

        this.timer = setInterval(() => {
            if (this.props.page == "main") {
                console.log("leap main")
                // clicking
                if (this.state.indexFinger) {
                    if (this.state.indexFinger.velz < -300 && this.state.hovered) {
                        this.setState({ clicked: this.state.hovered })
                        this.props.handleClick(this.state.hovered);
                    } else { // hovering
                        const hovered = this.checkHover();
                        this.setState({ hovered });
                        this.props.handleHover(hovered);
                    }
                }

                if (this.state.hand) {
                    if (this.state.pinch > 0.9 && this.state.hand.pinchStrength < 0.1) {
                        this.setState({ pinch: "" });
                        this.props.handleExit();
                    } else {
                        this.setState({ pinch: this.state.hand.pinchStrength })
                    }
                }
            } else {
                if (this.state.hand) {
                    // console.log("here", this.state.hand.palmVelocity[1] > 300);

                    if (this.state.hand.palmVelocity[1] > 300) {
                        console.log("Unlock Intro");
                        this.props.handleUnlock();
                    }
                }
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

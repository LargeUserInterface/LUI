import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import LeapMotion from 'leapjs';
import { Fade } from '@material-ui/core';

const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];

const styles = {
    canvas: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 100,
        pointerEvents: 'none'
    }
};

class Leap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            frame: {},
            hand: "",
        }
    }

    componentDidMount() {
        // console.log("Intro leap is mounted")
        this.leap = LeapMotion.loop((frame) => {

            this.setState({
                frame,
                hand: frame.hands.length > 0 ? frame.hands[0] : ""
            });

            this.traceFingers(frame);
        });

        this.timer = setInterval(() => {
            // check for unlocking motion
            if (this.state.hand) {
                if (this.state.hand.palmVelocity[1] > 400) {
                    this.props.handleExit();
                }
            }
        }, 100);
    }

    componentWillUnmount() {
        console.log("Intro leap is unmounted")
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
            const { frame, hand } = this.state;

            if (hand) {
                hand.fingers.forEach((pointable) => {
                    const color = fingers[pointable.type];
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

    render() {
        const { classes } = this.props;

        return (
            <canvas className={classes.canvas} ref="canvas"></canvas>
        )
    }
}


Leap.propTypes = {
    handleUnlock: PropTypes.func
};

// TODO: better default values
Leap.defaultProps = {

};

export default withStyles(styles)(Leap);

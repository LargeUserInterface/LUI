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
            indexFinger: "",
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
                // const palmVelocity = this.state.hand.palmVelocity[0];
                // if (palmVelocity < -400) {
                //     this.props.handleSwipe("left");
                // } else if (palmVelocity > 400) {
                //     this.props.handleSwipe("right");
                // }

                const hovered = this.checkHover();
                if (hovered) {
                    // console.log("HOVERING", hovered);
                    this.setState({ hovered });
                }

                // clicking
                if (this.state.indexFinger.vel < -350 && this.state.hovered) {
                    console.log("CLICKED", this.state.hovered);
                    this.setState({ clicked: this.state.hovered })
                    this.props.handleClick(this.state.hovered);
                }

                if (this.state.pinch > 0.7 && this.state.hand.pinchStrength < 0.3) {
                    this.props.handleExit();
                } else {
                    this.setState({ pinch: this.state.hand.pinchStrength })
                }

                this.props.handleHover(hovered);
            }
        }, 100);
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

                if (pointable.type === 1) {
                    this.setState({
                        indexFinger: { x, y, vel: pointable.tipVelocity[2] }
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
        // console.log(this.props.photos);
        const videos = this.props.videos;
        const { x, y } = this.state.indexFinger;
        for (let i = 0; i < videos.length; i++) {
            if (videos[i]){
                const dims = ReactDOM.findDOMNode(videos[i]).getBoundingClientRect();
                if (x > dims.left && x < dims.right &&
                    y > dims.top - videoSizeOffset && y < dims.bottom + videoSizeOffset) {
                        // console.log("photo"+ String(i+1));
                    return ("video" + String(i + 1));
                }
            }
        }
        // console.log("no match");
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

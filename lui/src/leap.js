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
        zIndex: 10
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
            clicked: "",
        }
    }

    componentDidMount() {
        LeapMotion.loop((frame) => {
            this.setState({
                frame,
                hand: frame.hands.length > 0 ? frame.hands[0] : ""
            });
            this.traceFingers(frame);
        });

        setInterval(() => {
            if (this.props.main) {
                // clicking
                if(this.state.indexFinger.vel < -300 && this.state.hovered){
                    // console.log("CLICKED", this.state.hovered);
                    this.setState({clicked: this.state.hovered})
                    this.props.handleClick(this.state.hovered);
                } else { // hovering
                    const hovered = this.checkHover();
                    if (hovered) {
                        // console.log("HOVERING", hovered);
                        this.setState({hovered});
                        this.props.handleHover(hovered);
                    }
                }
            } else {
                // TODO: app specific handler
            }
        }, 100);
    }

    traceFingers(frame) {
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
            this.drawCircle([x, y], radius, color, pointable.type == 1);

            if (pointable.type == 1) {
                this.setState({
                    indexFinger: {x, y, vel: pointable.tipVelocity[2]}
                })
            }
        });
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
        const {x,y} = this.state.indexFinger;
        for (let i = 0; i < cards.length; i++) {
            const dims = ReactDOM.findDOMNode(cards[i]).getBoundingClientRect();
            if (x > dims.left && x < dims.right &&
        		y > dims.top && y < dims.bottom) {
        		return ("card"+String(i+1));
        	}
        }
        return ;
    }

    render() {
        const { classes, cards } = this.props;

        return (
            <canvas className={classes.canvas} ref="canvas"></canvas>
        )
    }
}


Leap.propTypes = {
    cards: PropTypes.array,
    main: PropTypes.bool,
    handleHover: PropTypes.func,
    handleClick: PropTypes.func,
};

// TODO: better default values
Leap.defaultProps = {
    cards: [],
    main: true,
    handleHover: () => {},
    handleClick: false
};

export default withStyles(styles)(Leap);

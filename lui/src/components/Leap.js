import React from 'react';
import PropTypes from 'prop-types';

export const FINGERS = ['#9bcfed', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'];
export const VIDEO_SIZE_OFFSET = 100;

/**
 * Canvas controlled by Leap motion event handlers.
 */
export default class Leap extends React.Component {
  propTypes = {
    // generic term for videos, photos, etc.
    data: PropTypes.array.isRequired,
    canvasStyles: PropTypes.object.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    // event handlers
    handleHover: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleSwipe: PropTypes.func.isRequired,
    handleExit: PropTypes.func.isRequired,
    // index finger state
    indexFinger: PropTypes.object.isRequired
  };

  defaultProps = {
    data: [],
    styles: {},
    handleHover: () => { },
    handleClick: () => { },
    handleSwipe: () => { },
    handleExit: () => { },
    indexFinger: { x, y, vel: pointable.tipVelocity[2] }
  };

  state = {
    frame: {},
    hand: '',
    indexFinger: '',
    hovered: '',
    pinch: '',
    clicked: ''
  };

  componentDidMount() {
    console.log('Leap is mounted');
    this.leap = LeapMotion.loop((frame) => {
      this.setState({
        frame,
        hand: frame.hands.length > 0 ? frame.hands[0] : ''
      });
      this.traceFingers(frame);
    });

    this.timer = setInterval(() => {
      if (this.state.hand) {
        // const palmVelocity = this.state.hand.palmVelocity[0];
        // if (palmVelocity < -400) {
        //     this.props.handleSwipe('left');
        // } else if (palmVelocity > 400) {
        //     this.props.handleSwipe('right');
        // }
        const hovered = this.checkHover();
        if (hovered) {
          // console.log('HOVERING', hovered);
          this.setState({ hovered });
        }
        // clicking
        if (this.state.indexFinger.vel < -350 && this.state.hovered) {
          console.log('CLICKED', this.state.hovered);
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
    console.log('Leap is unmounted');
    clearInterval(this.timer);
    this.leap.disconnect();
  }

  traceFingers(frame) {
    try {
      // TODO: make canvas and context global
      const canvas = this.refs.canvas;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      frame.pointables.forEach((pointable) => {
        const color = FINGERS[pointable.type];
        const position = pointable.stabilizedTipPosition;
        const normalized = frame.interactionBox.normalizePoint(position);
        const x = context.canvas.width * normalized[0];
        const y = context.canvas.height * (1 - normalized[1]);
        const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
        this.drawCircle([x, y], radius, color, pointable.type === 1);

        if (pointable.type === 1) {
          this.setState({ indexFinger: this.props.indexFinger });
        }
      });
    } catch (err) { }
  }

  drawCircle(center, radius, color, fill) {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    context.closePath();
    context.lineWidth = 10;
    if (fill) {
      context.fillStyle = color;
      context.fill();
    } else {
      context.strokeStyle = color;
      context.stroke();
    }
  }

  checkHover() {
    const { x, y } = this.state.indexFinger;
    this.props.data.forEach((d, index) => {
      const dims = ReactDOM.findDOMNode(d).getBoundingClientRect();
      if (
        x > dims.left &&
        x < dims.right &&
        y > dims.top - VIDEO_SIZE_OFFSET &&
        y < dims.bottom + VIDEO_SIZE_OFFSET
      ) {
        return 'data' + String(i + 1);
      }
    });
  }

  render() {
    const { canvasStyles, className, children, ...rest } = this.props;
    const Canvas = withStyles({
      // default styles
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 100,
      ...canvasStyles
    })(
      <canvas className={className} ref='canvas' />
    );
    return (
      <React.Fragment>
        <Canvas />
        {children}
      </React.Fragment>
    );
  }
}

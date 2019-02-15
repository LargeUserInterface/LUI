import React from 'react';
import PropTypes from 'prop-types';

export const THUMB = 0;
export const INDEX = 1;
export const MIDDLE = 2;
export const RING = 3;
export const PINKY = 4;
export const FINGERS = {
  [THUMB]: { color: '#9bcfed' },
  [INDEX]: { color: '#B2EBF2' },
  [MIDDLE]: { color: '#80DEEA' },
  [RING]: { color: '#4DD0E1' },
  [PINKY]: { color: '#26C6DA' }
};
export const SWIPE_LEFT = 'left';
export const SWIPE_RIGHT = 'right';
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
    interval: PropTypes.number.isRequired,
    // event handlers
    handleInterval: PropTypes.func.isRequired,
    handleHover: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleSwipe: PropTypes.func.isRequired,
    handleExit: PropTypes.func.isRequired,
    // handle finger states
    indexFingerDrawState: PropTypes.func.isRequired,
    thumbDrawState: PropTypes.func,
    debug: PropTypes.bool
  };

  defaultProps = {
    data: [],
    canvasStyles: {},
    interval: 100,
    handleHover: () => {},
    handleClick: () => {},
    handleSwipe: () => {},
    handleExit: () => {},
    indexFingerDrawState: (x, y, pointable) => ({
      x, y, vel: pointable.tipVelocity[2]
    }),
    debug: true
  };

  state = {
    frame: {},
    hand: {},
    thumb: {},
    indexFinger: {},
    hovered: false,
    clicked: false,
    pinch: 0.0
  };

  componentDidMount() {
    this.props.debug && console.log('Leap is mounted');
    this.leap = LeapMotion.loop((frame) => {
      this.setState({
        frame,
        hand: frame.hands.length > 0 ? frame.hands[0] : ''
      });
      this.traceFingers(frame);
    });

    this.timer = setInterval(() => {
      if (this.state.hand) {
        const palmVelocity = this.state.hand.palmVelocity[0];
        if (palmVelocity < -400) {
          this.props.handleSwipe('left');
        } else if (palmVelocity > 400) {
          this.props.handleSwipe('right');
        }
        const isHovered = this.isHovered();
        if (isHovered) {
          this.setState({ hovered: isHovered });
        }
        // clicking
        if (this.state.indexFinger.vel < -350 && isHovered) {
          this.props.debug && console.log('CLICKED', isHovered);
          this.setState({ clicked: isHovered })
          this.props.handleClick(isHovered);
        }
        if (this.state.pinch > 0.7 && this.state.hand.pinchStrength < 0.3) {
          this.props.handleExit();
        } else {
          this.setState({ pinch: this.state.hand.pinchStrength })
        }
        this.props.handleHover(isHovered);
      }
    }, this.props.interval);
  }

  componentWillUnmount() {
    this.props.debug && console.log('Leap is unmounted');
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
        const { type, stabilizedTipPosition, touchDistance } = pointable;
        const { color } = FINGERS[type];
        const position = stabilizedTipPosition;
        const normalized = frame.interactionBox.normalizePoint(position);
        const x = context.canvas.width * normalized[0];
        const y = context.canvas.height * (1 - normalized[1]);
        const radius = Math.min(20 / Math.abs(touchDistance), 50);
        this.drawCircle(x, y, radius, color, type === INDEX);

        this.handleFingerDrawStates(x, y, pointable);
      });
    } catch (err) {}
  }

  drawCircle(x, y, radius, color, shouldFill) {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.lineWidth = 10;
    if (shouldFill) {
      context.fillStyle = color;
      context.fill();
    } else {
      context.strokeStyle = color;
      context.stroke();
    }
  }

  isHovered() {
    const { x, y } = this.state.indexFinger;
    this.props.data.forEach((dataItem, index) => {
      const dims = ReactDOM.findDOMNode(dataItem).getBoundingClientRect();
      if (
        x > dims.left &&
        x < dims.right &&
        y > dims.top - VIDEO_SIZE_OFFSET &&
        y < dims.bottom + VIDEO_SIZE_OFFSET
      ) {
        this.props.debug && console.log('HOVERED data' + String(i + 1));
        return true;
      }
      return false;
    });
  }

  handleFingerDrawStates(x, y, pointable) {
    switch (pointable.type) {
      case INDEX:
        this.props.indexFingerDrawState && this.setState({
          indexFinger: this.props.indexFingerDrawState(x, y, pointable)
        });
        break;
      case THUMB:
        this.props.thumbDrawState && this.setState({
          thumb: this.props.thumbDrawState(x, y)
        });
        break;
      default:
        return;
    }
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

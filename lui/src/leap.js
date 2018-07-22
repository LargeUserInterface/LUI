import PropTypes from 'prop-types'
import React from 'react'
import Leap from 'leapjs'
import omit from 'lodash.omit'

export class LeapProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frame: {}
    }
  }

  getChildContext() {
    return {
      leapContextFrame: this.state.frame
    }
  }

  componentDidMount() {
    const { options } = this.props
    Leap.loop(options, (frame) => {
      this.setState({ frame })
    })
  }

  render() {
    const { children } = this.props
    return <div>{children}</div>
  }
}

LeapProvider.propTypes = {
  options: PropTypes.object
}

LeapProvider.defaultProps = {
  options: {}
}

LeapProvider.childContextTypes = {
  leapContextFrame: PropTypes.object
}


export function withLeapContainer(WrappedComponent) {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const LeapContainer = (props, context) => {
    const frame = context.leapContextFrame
    const passedProps = omit(props, ['children', 'frame'])

    return (
      <WrappedComponent frame={frame} {...passedProps}>
        {props.children}
      </WrappedComponent>
    )
  }

  LeapContainer.displayName = `LeapContainer(${wrappedComponentName})`

  LeapContainer.contextTypes = {
    leapContextFrame: PropTypes.object
  }

  return LeapContainer
}

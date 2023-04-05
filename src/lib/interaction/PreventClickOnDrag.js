import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PreventClickOnDrag extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired
  }

  handleMouseDown = evt => {
    if (evt.button === 0) { //left click
      this.originClickX = evt.clientX;
      this.props.onMouseDown(evt)
    }
  }

  handleMouseMove = evt => {
    if (this.originClickX)
      this.props.onMouseMove(evt)
  }

  handleClick = evt => {
    if (!this.cancelClick) {
      this.props.onClick(evt)
    }

    this.cancelClick = false
    this.originClickX = null
  }

  render() {
    const childElement = React.Children.only(this.props.children)
    return React.cloneElement(childElement, {
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick
    })
  }
}

export default PreventClickOnDrag

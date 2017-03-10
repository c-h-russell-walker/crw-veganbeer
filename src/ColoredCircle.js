import React, { Component } from 'react';

class ColoredCircle extends Component {
  render() {
    return <span className={'circle ' + this.props.circleColor.toLowerCase()}></span>;
  }
}

export default ColoredCircle;
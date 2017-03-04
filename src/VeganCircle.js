import React, { Component } from 'react';

class VeganCircle extends Component {
  render() {
    return <span className={'circle ' + this.props.circleColor.toLowerCase()}></span>;
  }
}

export default VeganCircle;
import { autobind } from 'core-decorators';

import { preventDefault } from '../decorators/decorators';

import React, { Component } from 'react';

class Button extends Component {
  render() {
    let opts = {};
    if (this.props.disabled) {
      opts['disabled'] = 'disabled';
    }
    return (
      <button className="button"
              onClick={this._handleClick}
              {...opts}
              type="button">{this.props.displayText}</button>
    );
  }

  @autobind
  @preventDefault
  _handleClick(evt) {
    this.props.callback();
  }
}

export default Button;

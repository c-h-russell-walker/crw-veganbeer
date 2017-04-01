import { autobind } from 'core-decorators';

import { preventDefault } from '../decorators/decorators';

import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="button"
              onClick={this._handleClick}
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
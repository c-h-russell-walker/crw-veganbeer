import { autobind } from 'core-decorators';

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
  _handleClick(evt) {
    evt.preventDefault();
    this.props.callback();
  }
}

export default Button;
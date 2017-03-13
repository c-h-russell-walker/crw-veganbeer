import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="button"
              onClick={this._handleClick.bind(this)}
              type="button">{this.props.displayText}</button>
    );
  }

  _handleClick(evt) {
    evt.preventDefault();
    this.props.callback();
  }
}

export default Button;
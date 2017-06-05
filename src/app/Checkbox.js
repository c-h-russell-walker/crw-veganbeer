import { autobind } from 'core-decorators';

import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    return (
      <label>
        <input
          className="checkbox"
          onChange={this._handleChange}
          checked={this.props.checked}
          type="checkbox"
          value={this.props.displayText} />
        {this.props.displayText}
      </label>
    );
  }

  @autobind
  _handleChange(evt) {
    this.props.callback(evt);
  }
}

export default Checkbox;

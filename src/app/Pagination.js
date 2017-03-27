import { autobind } from 'core-decorators';

import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    return (
      <button onClick={this._handleClick}
              value={this.props.page}
              className={`pager ${this._currentClass()}`}
              type="button">{this.props.page}</button>
    );
  }

  _currentClass() {
    // TODO - maybe inject the string 'Digit' - so easier to change in the future
    let page = (this.props.page === 'Digit') ? 'Digit' : this.props.page;
    return `${(page === this.props.current) ? 'current-page' : ''}`;
  }

  @autobind
  _handleClick(evt) {
    this.props.callback(evt);
  }
}

export default Pagination;
import { autobind } from 'core-decorators';

import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    return (
      <button onClick={this._handleClick}
              value={this.props.page}
              className={`pager ${(this.props.page === this.props.current) ? 'current-page' : ''}`}
              type="button">{this.props.page}</button>
    );
  }

  @autobind
  _handleClick(evt) {
    this.props.callback(evt);
  }
}

export default Pagination;

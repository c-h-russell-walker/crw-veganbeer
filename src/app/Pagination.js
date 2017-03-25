import { autobind } from 'core-decorators';

import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    return (
      <button onClick={this._handleClick}
              value={this.props.page}
              className={this._className()}
              type="button">{this.props.page}</button>
    );
  }

  _className() {
    return `
      pager
      ${(this.props.page === this.props.current) ? 'current-page' : ''}
    `;
  }

  @autobind
  _handleClick(evt) {
    this.props.callback(evt);
  }
}

export default Pagination;
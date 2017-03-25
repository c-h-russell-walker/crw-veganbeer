import { autobind } from 'core-decorators';

import React, { Component } from 'react';

import Pagination from './Pagination';

class Paginator extends Component {
  render() {
    return (
      <div>
        {this._renderPages()}
      </div>
    );
  }

  _renderPages() {
    if (this.props.pages) {
      return this.props.pages.map((page) => {
        return (
          <Pagination page={page}
                      key={page}
                      current={this.props.current}
                      callback={this._handleClick} />
        );
      });
    }
  }

  @autobind
  _handleClick(evt) {
    this.props.callback(evt);
  }
}

export default Paginator;
import { autobind } from "core-decorators";

import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { page, current } = this.props;
    return (
      <button
        onClick={this._handleClick}
        value={page}
        className={`pager ${page === current ? "current-page" : ""}`}
        type="button"
      >
        {page}
      </button>
    );
  }

  @autobind
  _handleClick(evt) {
    this.props.callback(evt);
  }
}

export default Pagination;

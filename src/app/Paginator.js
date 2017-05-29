import { autobind } from 'core-decorators';

import { ignoreStringPrefix } from '../helpers/ignoreStringPrefix';

import React, { Component } from 'react';

import Pagination from './Pagination';

class Paginator extends Component {
  constructor() {
    super();
    this.state = {
      pages: []
    };

    this.digit = 'Digit';
    this.other = 'Other';
    this.numericReg = /^\d$/;
    this.alphaReg = /^[a-zA-Z]$/;
  }

  componentDidUpdate() {
    if (this.props.brewers.length && !this.state.pages.length) {
      // We use a Set to assure there's no dupes (and use flags to add other & digit to end of Set)
      // lastly we destructure into an array (from the Set)
      // TODO - damn you IE, check for support and/or transpiling of `new Set()` and methods

      let pageSet = new Set();
      let digitFlag = false;
      let otherFlag = false;

      this.props.brewers.forEach((br) => {
        let companyInitial = ignoreStringPrefix(br.company_name, 'The ')[0];
        if (this.alphaReg.test(companyInitial)) {
          pageSet.add(companyInitial.toUpperCase());
        } else if (!digitFlag && this.numericReg.test(companyInitial)) {
          digitFlag = true;
        } else if (!otherFlag) {
          otherFlag = true;
        }
      });

      // Let's put 'Digit' at the end
      if (digitFlag) {
        pageSet.add(this.digit);
      }

      // If we have any 'Other' values let's put that after Digit
      if (otherFlag) {
        pageSet.add(this.other);
      }

      this.setState({
        pages: [...pageSet]
      });
    }
  }

  render() {
    return (
      <div>
        {this._renderPages()}
      </div>
    );
  }

  _renderPages() {
    return this.state.pages.map((page) => {
      return (
        <Pagination page={page}
                    key={page}
                    current={this.props.current}
                    callback={this._handleClick} />
      );
    });
  }

  @autobind
  _handleClick(evt) {
    this.props.callback(evt);
  }
}

export default Paginator;

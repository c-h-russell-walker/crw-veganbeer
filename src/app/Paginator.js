import { autobind } from 'core-decorators';

import React, { Component } from 'react';

import Pagination from './Pagination';

class Paginator extends Component {
  constructor() {
    super();
    this.state = {
      pages: undefined
    };

    this.digit = 'Digit';
    this.other = 'Other';
    this.numericReg = /^\d$/;
    this.alphaReg = /^[a-zA-Z]$/;
  }

  componentDidUpdate() {
    if (this.props.brewers.length && !this.state.pages) {
      // `map` creates array of uppercase first characters
      // then we use a Set to get rid of dupes
      // lastly we destructure into a literal array, literally.
      // TODO - damn you IE, check for support and/or transpiling of `new Set()` and methods
      let pageArray = this.props.brewers.map((br) => {
        let companyInitial = br.company_name[0];
        if (this.numericReg.test(companyInitial)) {
          return this.digit;
        } else if (this.alphaReg.test(companyInitial)) {
          return companyInitial.toUpperCase();
        } else {
          return this.other;
        }
      });

      let pageSet = new Set(pageArray);

      // Let's put 'Digit' at the end
      if (pageSet.has(this.digit)) {
        pageSet.delete(this.digit);
        pageSet.add(this.digit);
      }

      // If we have any 'Other' values let's put that after Digit
      if (pageSet.has(this.other)) {
        pageSet.delete(this.other);
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
    if (this.state.pages) {
      return this.state.pages.map((page) => {
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
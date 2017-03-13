import React, { Component } from 'react';

import { currentTimestamp } from '../helpers/currentTimestamp';

class DateRetrieved extends Component {
  render() {
    return (
      <div>
        Generated with <a target="_blank" href="http://www.barnivore.com">Barnivore</a> data from
        &nbsp;<time dateTime={this.formattedDateTime()}>{this.retrievedDate()}</time>
      </div>
    );
  }

  formattedDateTime() {
    // TODO - worry about polyfill of String().padStart ??
    let timestamp = this.props.retrievedTimestamp || currentTimestamp();
    let date = new Date(parseInt(timestamp, 10));
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  retrievedDate() {
    let timestamp = this.props.retrievedTimestamp || currentTimestamp();
    return new Date(parseInt(timestamp, 10)).toLocaleDateString('en-US');
  }
}

export default DateRetrieved;

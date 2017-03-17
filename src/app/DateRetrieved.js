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
    let timestamp = this.props.retrievedTimestamp || currentTimestamp();
    let date = new Date(parseInt(timestamp, 10));
    // TODO - worry about polyfill of String().padStart ??
    let month, day;
    if (String.prototype.padStart) {
      month = String(date.getMonth() + 1).padStart(2, '0');
      day = String(date.getDate()).padStart(2, '0');
    } else {
      month = date.getMonth() + 1;
      day = date.getDate();
    }
    return `${date.getFullYear()}-${month}-${day}`;
  }

  retrievedDate() {
    let timestamp = this.props.retrievedTimestamp || currentTimestamp();
    return new Date(parseInt(timestamp, 10)).toLocaleDateString('en-US');
  }
}

export default DateRetrieved;

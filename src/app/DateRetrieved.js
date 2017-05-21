import React, { Component } from 'react';

import { currentTimestamp } from '../helpers/currentTimestamp';

class DateRetrieved extends Component {
  render() {
    let timestamp = parseInt(this.props.retrievedTimestamp, 10) || currentTimestamp();
    let date = new Date(timestamp);
    return (
      <div>
        Generated with <a target="_blank" href="http://www.barnivore.com">Barnivore</a> data from
        &nbsp;<time id="date-retrieved-time" dateTime={this.formattedDateTime(date)}>{this.retrievedDate(date)}</time>
      </div>
    );
  }

  formattedDateTime(date) {
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  retrievedDate(date) {
    return date.toLocaleDateString('en-US');
  }
}

export default DateRetrieved;

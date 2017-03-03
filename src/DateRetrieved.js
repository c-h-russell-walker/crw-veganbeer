import React, { Component } from 'react';

class DateRetrieved extends Component {
  render() {
    return (
      <div>
        Generated with <a target="_blank" href="http://www.barnivore.com">Barnivore</a> data from <em>{this.retrievedDate()}</em>
      </div>
    );
  }

  retrievedDate() {
    if (this.props.retrievedTimestamp) {
      return new Date(parseInt(this.props.retrievedTimestamp, 10)).toLocaleDateString("en-US");
    } else {
      // This is okay as a default during rendering
      return new Date().toLocaleDateString("en-US");
    }
  }
}

export default DateRetrieved;

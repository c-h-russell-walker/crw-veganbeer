import React, { Component } from 'react';

class Telephone extends Component {
  render() {
    return (
      <a className="tel-link" href={this._renderPhoneHref()}>{this.props.phone}</a>
    );
  }

  _renderPhoneHref() {
    return `tel:${this._stripNonNumeric()}`;
  }

  _stripNonNumeric() {
    return this.props.phone && this.props.phone.replace(/\D/g,'');
  }
}

export default Telephone;
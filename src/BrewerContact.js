import React, { Component } from 'react';

import Telephone from './Telephone';

class BrewerContact extends Component {
  render() {
    return (
      <div className={'brewer-contact ' + (this.props.brewerInfo ? '' : 'hidden')}>
        {/* TODO - double check this html format and also style it */}
        <address>
            {this._renderAddress()}
            {/* TODO - make this into its own component? */}
            <span className={(this.props.brewerInfo.country === 'USA' ? 'hidden' : '' )}>{this.props.brewerInfo.country}</span>
        </address>
        <Telephone phone={this.props.brewerInfo.phone} />
      </div>
    );
  }

  _renderAddress() {
    const addr = [
        this.props.brewerInfo.address,
        this.props.brewerInfo.city,
        this.props.brewerInfo.state
    ];
    // We filter out "falsy" empty strings
    return addr.filter(x => x).join(', ');
  }
}

export default BrewerContact;
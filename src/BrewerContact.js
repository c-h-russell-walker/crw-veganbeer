import React, { Component } from 'react';

import Telephone from './Telephone';

class BrewerContact extends Component {
  render() {
    return (
      <div className={'brewer-contact ' + (this.props.brewerInfo ? '' : 'hidden')}>
        {/* TODO - double check this html format and also style it */}
        <address>
            {this.props.brewerInfo.address}, {this.props.brewerInfo.city}, {this.props.brewerInfo.state}
            {/* TODO - make this into its own component? */}
            <span className={(this.props.brewerInfo.country === 'USA' ? 'hidden' : '' )}>{this.props.brewerInfo.country}</span>
        </address>
        <Telephone phone={this.props.brewerInfo.phone} />
      </div>
    );
  }
}

export default BrewerContact;
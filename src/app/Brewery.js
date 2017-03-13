import React, { Component } from 'react';

import BrewerInfo from './BrewerInfo'
import ColoredCircle from './ColoredCircle'

class Brewery extends Component {
  constructor() {
    super();
    this.state = {
      moreInfo: null,
      moreInfoHidden: true
    };
  }

  render() {
    const brewery = this.props.brewer;
    return (
      <div className="brewery">
        <ColoredCircle circleColor={brewery.red_yellow_green} />
        <span><a target="_blank" href={this.breweryUrl()}>{brewery.company_name}</a></span>
        -
        <span>{brewery.status}</span>
        <span className='more-info'
              onClick={this._handleInfoClick.bind(this)}>More Info/Products</span>
        <div className={this.state.moreInfoHidden ? 'hidden' : ''}>
          {this.state.moreInfo}
        </div>
      </div>
    );
  }

  _handleInfoClick() {
    if (!this.state.moreInfo) {
      this.setState({
        moreInfo: <BrewerInfo brewerId={this.props.brewer.id} />
      });
      this.setState({moreInfoHidden: false});
    } else {
      this.setState({moreInfoHidden: !this.state.moreInfoHidden});
    }
  }

  breweryUrl() {
    let url = this.props.brewer.url
    // Prepend protocol agnostic double slash if no protocol present
    return (url.startsWith('http') ? '' : '//') + url;
  }
}

export default Brewery;
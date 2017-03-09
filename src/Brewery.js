import React, { Component } from 'react';

import BrewerInfo from './BrewerInfo'
import VeganCircle from './VeganCircle'

class Brewery extends Component {
  constructor() {
    super();
    this.state = {
      moreInfo: null
    };
  }

  render() {
    const brewery = this.props.brewer;
    return (
      <div className="brewery">
        <VeganCircle circleColor={brewery.red_yellow_green} />
        <span><a target="_blank" href={this.breweryUrl()}>{brewery.company_name}</a></span>
        -
        <span>{brewery.status}</span>
        <span className='more-info'
              onClick={this._handleInfoClick.bind(this)}>More Info/Products</span>
        <div>{this.state.moreInfo}</div>
      </div>
    );
  }

  _handleInfoClick() {
    this.setState({
      moreInfo: <BrewerInfo brewerId={this.props.brewer.id} />
    });
  }

  breweryUrl() {
    let url = this.props.brewer.url
    // Prepend protocol agnostic double slash if no protocol present
    return (url.startsWith('http') ? '' : '//') + url;
  }
}

export default Brewery;

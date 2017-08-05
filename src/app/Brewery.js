import { autobind } from 'core-decorators';

import React, { Component } from 'react';

import BrewerInfo from './BrewerInfo';
import BarnivoreLink from './BarnivoreLink';
import CityDetails from './CityDetails';
import ColoredCircle from './ColoredCircle';

class Brewery extends Component {
  constructor() {
    super();
    this.state = {
      moreInfo: null,
      moreInfoHidden: true
    };
  }

  render() {
    /* TODO - address difference between margin and/or &nbsp; */
    const {
      red_yellow_green,
      company_name,
      status,
      city,
      state,
      tag,
      id
    } = this.props.brewer;

    return (
      <div className="brewery">
        <ColoredCircle circleColor={red_yellow_green} />
        <span><a target="_blank" href={this.breweryUrl()}>{company_name}</a></span>
        -
        <span className="status brewery-status">{status}</span>
        <span className='more-info'
              onClick={this._handleInfoClick}>Quick Details</span>
        -
        &nbsp;
        <BarnivoreLink tag={tag} id={id} />
        <CityDetails
          filteringByCity={this.props.filteringByCity && this.state.moreInfoHidden}
          city={city}
          state={state} />
        <div className={this.state.moreInfoHidden ? 'hidden' : ''}>
          {this.state.moreInfo}
        </div>
      </div>
    );
  }

  @autobind
  _handleInfoClick() {
    if (!this.state.moreInfo) {
      this.setState({
        moreInfoHidden: false,
        moreInfo: <BrewerInfo brewerId={this.props.brewer.id} />
      });
    } else {
      this.setState({moreInfoHidden: !this.state.moreInfoHidden});
    }
  }

  breweryUrl() {
    let url = this.props.brewer.url;
    // Prepend protocol agnostic double slash if no protocol present
    return (url.startsWith('http') ? '' : '//') + url;
  }
}

export default Brewery;

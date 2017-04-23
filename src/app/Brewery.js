import { autobind } from 'core-decorators';

import React, { Component } from 'react';

import BrewerInfo from './BrewerInfo';
import BarnivoreLink from './BarnivoreLink';
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
    const brewery = this.props.brewer;
    return (
      <div className="brewery">
        <ColoredCircle circleColor={brewery.red_yellow_green} />
        <span><a target="_blank" href={this.breweryUrl()}>{brewery.company_name}</a></span>
        -
        <span className="status brewery-status">{brewery.status}</span>
        <span className='more-info'
              onClick={this._handleInfoClick}>Quick Details</span>
        -
        &nbsp;
        <BarnivoreLink tag={this.props.brewer.tag} id={this.props.brewer.id} />
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

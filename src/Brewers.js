import { autobind } from 'core-decorators';

import React, { Component } from 'react';

import Brewery from './Brewery'

class Brewers extends Component {
  constructor() {
    super();
    this.state = {
      barnivoreUrl: 'http://www.barnivore.com/beer.json',
      brewers: [],
      filterText: ''
    };
  }

  render() {
    return (
      <div className="Brewers">
        <input placeholder="Filter by Brewery"
               ref="searchText"
               onChange={this._handleFilter}
               id="searchText"
               name="searchText"
               />
        {this.renderBrewers()}
      </div>
    );
  }

  @autobind
  _handleFilter(evt) {
    this.setState({filterText: this.refs.searchText.value.trim()});
  }

  renderBrewers() {
    // TODO - do a better version of debounce here
    if (this.state.filterText.length > 2) {
      return this.state.brewers
        .filter(x => new RegExp(this.state.filterText, 'i').test(x.company_name))
        .map(function(brewer) {
          return <Brewery key={brewer.id} brewer={brewer} />
        });
    } else {
      return this.state.brewers.map(function(brewer) {
          return <Brewery key={brewer.id} brewer={brewer} />
      });
    }
  }

  componentDidMount() {
    if (self.localStorage) {
      // We'll want to refetch if we deem old enough
      let beerInfo = self.localStorage.getItem('beerInfo');
      beerInfo = beerInfo && JSON.parse(beerInfo);
      const retrievedTimestamp = parseInt(this.props.retrievedTimestamp, 10);

      // If timestamp is less than or equal to 24 hours ago consider it stale
      const staleData = retrievedTimestamp <= new Date((+ new Date()) - (3600000 * 24));

      if (staleData || !beerInfo) {
        this._fetchBeerInfo();
      } else {
        this.setState({ brewers: beerInfo});
      }
    } else {
      console.warn('don\'t want to hit their API at will - TODO');
    }
  }

  @autobind
  _fetchBeerInfo() {
    fetch(this.state.barnivoreUrl)
      .then(this._handleFetchBeerInfo, this._handleFetchError);
  }

  @autobind
  _handleFetchBeerInfo(response) {
    response.json().then(response => {
      const brewers = response.map(x => x.company);
      this.setState({ brewers });
      self.localStorage.setItem('retrievedTimestamp', + new Date());
      self.localStorage.setItem('beerInfo', JSON.stringify(brewers));
    });
  }

  _handleFetchError(error) {
    console.error(error);
  }
}

export default Brewers;

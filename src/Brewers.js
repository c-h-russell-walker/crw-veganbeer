import { autobind } from 'core-decorators';

import { debounce } from './helpers/debounce';

import logo from './logo.svg';
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
    this._handleFilter = debounce(this._handleFilter);
  }

  render() {
    return (
      <div className="brewers">
        <input placeholder="Filter by Brewery"
               ref="searchText"
               onChange={this._handleFilter}
               id="search-text"
               name="searchText"
               />
        <div className={(this.state.brewers.length ? 'hidden' : '')}>
          <img src={logo} className='app-logo' alt="logo" />
          <p className='loading'>Loading</p>
        </div>
        {this._renderBrewers()}
      </div>
    );
  }

  @autobind
  _handleFilter(evt) {
    // TODO - Filter on other data points maybe??
    this.setState({filterText: this.refs.searchText.value.trim()});
  }

  _renderBrewers() {
    let breweries = this.state.brewers;
    if (this.state.filterText.length > 2) {
      breweries = breweries
        .filter(x => new RegExp(this.state.filterText, 'i').test(x.company_name));
    }

    return breweries.map(function(brewer) {
        return <Brewery key={brewer.id} brewer={brewer} />
    });
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

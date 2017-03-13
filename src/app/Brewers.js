import { debounce } from '../helpers/debounce';
import { currentTimestamp } from '../helpers/currentTimestamp';
import { baseUrl } from '../constants/constants';

import logo from '../logo.svg';
import React, { Component } from 'react';

import Brewery from './Brewery';
import Button from './Button';
import NoResults from './NoResults';

class Brewers extends Component {
  constructor() {
    super();
    this.state = {
      barnivoreUrl: `${baseUrl}beer.json`,
      brewers: [],
      filterText: '',
      filterCity: ''
    };
    this._handleFilter = debounce(this._handleFilter.bind(this));
    this._handleCityFilter = debounce(this._handleCityFilter.bind(this));
  }

  render() {
    return (
      <div className="brewers">
        <input placeholder="Filter by Brewery"
               ref="searchText"
               onChange={this._handleFilter.bind(this)}
               id="search-text"
               className="filter"
               name="searchText"
               />
        <input placeholder="Filter by City"
               ref="searchCity"
               onChange={this._handleCityFilter.bind(this)}
               id="search-city"
               className="filter"
               name="searchCity"
               />
        <Button displayText={'Clear Filters'}
                callback={this._clearFilters.bind(this)}
                />
        <div className={(this.state.brewers.length ? 'hidden' : '')}>
          <img src={logo} className='app-logo' alt="logo" />
          <p className='loading'>Loading</p>
        </div>
        {this._renderBrewers()}
      </div>
    );
  }

  _handleFilter() {
    this.setState({filterText: this.refs.searchText.value.trim()});
  }

  _handleCityFilter() {
    this.setState({filterCity: this.refs.searchCity.value.trim()});
  }

  _clearFilters() {
    this.setState({filterText: ''});
    this.setState({filterCity: ''});
  }

  _renderBrewers() {
    let breweries = this.state.brewers;
    if (this.state.filterText.length > 2) {
      breweries = breweries
        .filter(x => new RegExp(this.state.filterText, 'i').test(x.company_name));
    }

    if (this.state.filterCity.length > 2) {
      breweries = breweries
        .filter(x => new RegExp(this.state.filterCity, 'i').test(x.city));
    }

    if (breweries.length) {
      return breweries.map(function(brewer) {
          return <Brewery key={brewer.id} brewer={brewer} />
      });
    } else if (this.state.filterCity || this.state.filterText) {
      return <NoResults />
    }
  }

  componentDidMount() {
    this.refs.searchText.focus();

    // We'll want to refetch if we deem old enough
    let beerInfo = self.localStorage.getItem('beerInfo');
    beerInfo = beerInfo && JSON.parse(beerInfo);
    const retrievedTimestamp = parseInt(this.props.retrievedTimestamp, 10);

    // If timestamp is less than or equal to 24 hours ago consider it stale
    const staleData = retrievedTimestamp <= new Date(currentTimestamp() - (3600000 * 24));

    if (staleData || !beerInfo) {
      // Fetching all new data so we clear localStorage w/ individual breweries' products
      this._fetchBeerInfo.apply(this);
      self.localStorage.clear();
    } else {
      this.setState({ brewers: beerInfo});
    }
  }

  _fetchBeerInfo() {
    fetch(this.state.barnivoreUrl)
      .then(this._handleFetchBeerInfo.bind(this), this._handleFetchError);
  }

  _handleFetchBeerInfo(response) {
    response.json().then(response => {
      const brewers = response.map(x => x.company);
      this.setState({ brewers });
      const timestamp = currentTimestamp();
      self.localStorage.setItem('retrievedTimestamp', timestamp);
      this.props.timestampHandler(timestamp);
      self.localStorage.setItem('beerInfo', JSON.stringify(brewers));
    });
  }

  _handleFetchError(error) {
    console.error(error);
  }
}

export default Brewers;
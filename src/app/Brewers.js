import { autobind } from 'core-decorators';

// TODO - was able to leverage `debounce()` earlier
// import { debounce } from '../helpers/debounce';

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
  }

  render() {
    return (
      <div className="brewers">
        <input placeholder="Filter by Brewery"
               ref="searchText"
               value={this.state.filterText}
               onChange={this._handleFilter}
               id="search-text"
               className="filter"
               name="searchText"
               />
        <input placeholder="Filter by City"
               value={this.state.filterCity}
               onChange={this._handleCityFilter}
               id="search-city"
               className="filter"
               name="searchCity"
               />
        <Button displayText={'Clear Filters'}
                callback={this._clearFilters}
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
    this.setState({filterText: evt.target.value.trim()});
  }

  @autobind
  _handleCityFilter(evt) {
    this.setState({filterCity: evt.target.value.trim()});
  }

  @autobind
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
      this._fetchBeerInfo();
      self.localStorage.clear();
    } else {
      this.setState({ brewers: beerInfo});
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

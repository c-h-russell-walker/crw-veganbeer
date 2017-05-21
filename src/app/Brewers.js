import { autobind } from 'core-decorators';
import {debounce} from 'throttle-debounce';

import { currentTimestamp } from '../helpers/currentTimestamp';
import { baseUrl } from '../constants/constants';

import React, { Component } from 'react';

import Brewery from './Brewery';
import Button from './Button';
import NoResults from './NoResults';
import Loader from './Loader';
import Paginator from './Paginator';

class Brewers extends Component {
  constructor() {
    super();
    this.state = {
      barnivoreUrl: `${baseUrl}beer.json`,
      brewers: [],
      filterText: '',
      filterCity: ''
    };

    this._setFilter = debounce(250, this._setFilter);
  }

  render() {
    return (
      <div className="brewers">
        <input placeholder="Filter by Brewery"
               ref="searchText"
               onChange={this._handleNameFilter}
               id="search-text"
               className="filter"
               name="searchText"
               />
        <input placeholder="Filter by City"
               ref="searchCity"
               onChange={this._handleCityFilter}
               id="search-city"
               className="filter"
               name="searchCity"
               />
        <Button displayText={'Clear Filters'}
                callback={this._clearFilters}
                disabled={!this._checkFiltersForValues()}
                />
        <Paginator brewers={this.state.brewers}
                   current={this.props.currentPage}
                   callback={this._handlePageClick} />
        <Loader hidden={this.state.brewers.length} />
        {this._renderBrewers()}
      </div>
    );
  }

  @autobind
  _handleNameFilter(evt) {
    this._setFilter({filter: 'filterText', value: evt.target.value});
  }

  @autobind
  _handleCityFilter(evt) {
    this._setFilter({filter: 'filterCity', value: evt.target.value});
  }

  _checkFiltersForValues() {
    return Object.values(this.refs).filter(ref => ref.value).length;
  }

  _setFilter({filter, value}) {
    let filterObj = {}
    filterObj[filter] = value;
    this.setState(filterObj);
    if (this._checkFiltersForValues()) {
      this._clearCurrentPage();
    } else {
      this._setCurrentPageFromSession();
    }
  }

  _clearCurrentPage() {
    this.props.updateCurrentPage('');
  }

  _setCurrentPageFromSession() {
    // If we've cleared the currentPage before and it's an empty string we can get what was in storage
    this.props.updateCurrentPage(self.sessionStorage.getItem('currentPage'));
  }

  @autobind
  _handlePageClick(evt) {
    this.props.updateCurrentPage(evt.target.value);
    this._clearFilters();
  }

  @autobind
  _clearFilters() {
    this.refs.searchText.value = '';
    this.refs.searchCity.value = '';
    this.setState({
      filterText: '',
      filterCity: '',
    });
    this._setCurrentPageFromSession();
  }

  _renderBrewers() {
    let breweries = this.state.brewers;
    if (this.state.filterText.length > 2) {
      let filterText = this.state.filterText.trim();
      breweries = breweries.filter(x => new RegExp(filterText, 'i').test(x.company_name));
    }

    if (this.state.filterCity.length > 2) {
      let filterCity = this.state.filterCity.trim();
      breweries = breweries.filter(x => new RegExp(filterCity, 'i').test(x.city));
    }

    let filtering = this.state.filterCity || this.state.filterText;
    if (breweries.length && !filtering) {
      const numericReg = /^\d$/;
      const alphaNumericReg = /^[a-zA-Z0-9]$/;
      return breweries.filter((br) => {
          if (this.props.currentPage === 'Digit') {
            return numericReg.test(br.company_name[0])
          } else if (this.props.currentPage === 'Other') {
            return !alphaNumericReg.test(br.company_name[0])
          } else {
            // TODO - filter with regex
              // if we did that we could also avoid the toUpperCase() and use `i`
            return br.company_name.toUpperCase().startsWith(this.props.currentPage)
          }
        }).map((brewer) => {
            return <Brewery key={brewer.id} brewer={brewer} />
        });
    } else if (breweries.length && filtering) {
      return breweries.map((brewer) => <Brewery key={brewer.id} brewer={brewer} />);
    } else if (filtering && !breweries.length) {
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
      this.props.updateDateRetrieved(currentTimestamp());
      self.localStorage.setItem('beerInfo', JSON.stringify(brewers));
    });
  }

  _handleFetchError(error) {
    console.error(error);
  }
}

export default Brewers;

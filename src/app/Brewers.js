import { autobind } from 'core-decorators';
import {debounce} from 'throttle-debounce';

import { currentTimestamp } from '../helpers/currentTimestamp';
import { ignoreStringPrefix } from '../helpers/ignoreStringPrefix';
import { baseUrl } from '../constants/constants';

import React, { Component } from 'react';

import Brewery from './Brewery';
import Button from './Button';
import Checkbox from './Checkbox';
import NoResults from './NoResults';
import Loader from './Loader';
import Paginator from './Paginator';

class Brewers extends Component {
  constructor() {
    super();
    this.state = {
      currentType: 'beer',
      beerInfo: [],
      liquorInfo: [],
      wineInfo: [],
      filterText: '',
      filterCity: ''
    };

    this.liquorTypes = ['beer', 'liquor', 'wine'];

    this._setFilter = debounce(250, this._setFilter);
    this.FILTER_LENGTH = 2;
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
                disabled={!this._checkFiltersForValues(0)}
                />
        {this._renderTypeCheckboxes()}
        <Paginator brewers={this.state.beerInfo}
                   current={this.props.currentPage}
                   callback={this._handlePageClick} />
        <Loader hidden={this.state.beerInfo.length} />
        {this._renderBrewers()}
      </div>
    );
  }

  _renderTypeCheckboxes() {
    return this.liquorTypes.map((liquorType) => {
      return <Checkbox checked={this.state.currentType === liquorType}
                       displayText={liquorType}
                       key={liquorType}
                       callback={this._handleTypeChange} />
    });
  }

  @autobind
  _handleTypeChange(evt) {
    this.setState({currentType: evt.target.value});
  }

  @autobind
  _handleNameFilter(evt) {
    if (evt.target.value.length > this.FILTER_LENGTH) {
      this._setFilter({filter: 'filterText', value: evt.target.value});
    } else {
      this._setFilter({filter: 'filterText', value: ''});
    }
  }

  @autobind
  _handleCityFilter(evt) {
    this._setFilter({filter: 'filterCity', value: evt.target.value});
  }

  _checkFiltersForValues(inputLength=this.FILTER_LENGTH) {
    return Object.values(this.refs).filter(ref => ref.value.length > inputLength).length;
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
    let breweries = this.state[`${this.state.currentType}Info`];

    // Sort array by company name - we want to remove "The "
    breweries.sort(function (a, b) {
      return ignoreStringPrefix(a.company_name, 'The ').localeCompare(ignoreStringPrefix(b.company_name, 'The '));
    });
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
            return ignoreStringPrefix(br.company_name, 'The ').toUpperCase().startsWith(this.props.currentPage);
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

    let beerInfo = self.localStorage.getItem('beerInfo');
    beerInfo = beerInfo && JSON.parse(beerInfo);
    // We'll want to refetch if we deem old enough
    const retrievedTimestamp = parseInt(this.props.retrievedTimestamp, 10);

    // If timestamp is less than or equal to 24 hours ago consider it stale
    const staleData = retrievedTimestamp <= new Date(currentTimestamp() - (3600000 * 24));

    if (true || staleData || !beerInfo) {
      // Fetching all new data so we clear localStorage w/ individual breweries' products
      this._fetchLiquorInfo();
      self.localStorage.clear();
    } else {
      this.setState({ brewers: beerInfo});
    }
  }

  @autobind
  _fetchLiquorInfo(liquorType) {
    this.liquorTypes.forEach((liquorType) => {
      fetch(`${baseUrl}${liquorType}.json`)
        .then(this._handleFetchBeerInfo.bind(this, liquorType), this._handleFetchError);
    });
  }

  _handleFetchBeerInfo(liquorType, response) {
    response.json().then(response => {
      const info = response.map(x => x.company);
      const liquorTypeInfo = {};
      liquorTypeInfo[`${liquorType}Info`] = info;

      this.setState(liquorTypeInfo);
      this.props.updateDateRetrieved(currentTimestamp());
      try {
        self.localStorage.setItem(`${liquorType}Info`, JSON.stringify(info));
      } catch(e) {
        console.warn(e);
      }
    });
  }

  _handleFetchError(error) {
    console.error(error);
  }
}

export default Brewers;

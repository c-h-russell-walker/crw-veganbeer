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
import Paginator from './Paginator';

class Brewers extends Component {
  constructor() {
    super();
    this.pages = [];
    this.state = {
      barnivoreUrl: `${baseUrl}beer.json`,
      brewers: [],
      currentPage: '',
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
        {/* TODO - make paginator have numeric button (also maybe 'other') */}
        <Paginator pages={this.state.pages}
                   current={this.state.currentPage}
                   callback={this._handlePageClick} />
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
    this._clearCurrentPage();
  }

  @autobind
  _handleCityFilter(evt) {
    this.setState({filterCity: evt.target.value.trim()});
    this._clearCurrentPage();
  }

  _clearCurrentPage() {
    // TODO - Pretty big - have to deal with UX/logic of pages and filters
    // do they interact or are they independent??
    this.setState({currentPage: ''});
  }

  @autobind
  _handlePageClick(evt) {
    this.setState({currentPage: evt.target.value});
    self.sessionStorage.setItem('currentPage', evt.target.value);
  }

  @autobind
  _clearFilters() {
    this.setState({
      filterText: '',
      filterCity: '',
      currentPage: self.sessionStorage.getItem('currentPage'),
    });
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

    let filtering = this.state.filterCity || this.state.filterText;
    if (breweries.length && !filtering) {
      return breweries.filter((br) => {
          return br.company_name.toUpperCase().startsWith(this.state.currentPage)
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

    if (!this.state.currentPage) {
      let curr = self.sessionStorage.getItem('currentPage');
      if (!curr) {
        curr = 'A';
        self.sessionStorage.setItem('currentPage', curr);
      }
      this.setState({currentPage: curr});
    }
  }

  componentDidUpdate() {
    // TODO - Is this where this should go?
    if (!this.state.pages && this.state.brewers) {
      // `map` creates array of uppercase first characters
      // then we use a Set to get rid of dupes
      // lastly we destructure into a literal array, literally.
      // TODO - damn you IE, check for support and/or transpiling of `new Set()`
      let pageSet = new Set(this.state.brewers.map((br) => br.company_name[0].toUpperCase()));
      this.setState({
        pages: [...pageSet]
      });
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

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as dateRetrievedActions from '../actions/date-retrieved-actions';
import * as currentPageActions from '../actions/current-page-actions';

import '../App.scss';

import DateRetrieved from './DateRetrieved';
import Brewers from './Brewers';


class App extends Component {
  render() {
    return (
      <div id="app">
        <div className="app-header">
          <h2>Welcome to VeganBeer</h2>
          <button id="refresh-button"
                  className="button"
                  onClick={() => { this.brewers.refreshData(); }}>Refresh Data</button>
          <DateRetrieved retrievedTimestamp={this.props.retrievedTimestamp} />
        </div>
        <Brewers
          ref={instance => { this.brewers = instance; }}
          retrievedTimestamp={this.props.retrievedTimestamp}
          updateDateRetrieved={this.props.actions.updateDateRetrieved}
          currentPage={this.props.currentPage}
          updateCurrentPage={this.props.actions.updateCurrentPage}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    retrievedTimestamp: state.retrievedTimestamp,
    currentPage: state.currentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...dateRetrievedActions,
        ...currentPageActions,
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


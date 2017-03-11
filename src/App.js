import React, {Component} from 'react';

import './App.scss';

import DateRetrieved from './DateRetrieved';
import Brewers from './Brewers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      retrievedTimestamp: self.localStorage.getItem('retrievedTimestamp')
    };
    this.timestampHandler = this.timestampHandler.bind(this);
  }

  timestampHandler(retrievedTimestamp) {
    this.setState({retrievedTimestamp});
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to VeganBeer</h2>
          <DateRetrieved retrievedTimestamp={this.state.retrievedTimestamp} />
        </div>
        <Brewers
          retrievedTimestamp={this.state.retrievedTimestamp}
          timestampHandler={this.timestampHandler}
        />
      </div>
    );
  }
}

export default App;

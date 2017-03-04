import React, {Component} from 'react';

import './App.less';
import './App.scss';
import './App.styl';

import DateRetrieved from './DateRetrieved';
import Brewers from './Brewers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      retrievedTimestamp: self.localStorage.getItem('retrievedTimestamp')
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to VeganBeer</h2>
          <DateRetrieved retrievedTimestamp={this.state.retrievedTimestamp} />
        </div>
        <Brewers retrievedTimestamp={this.state.retrievedTimestamp} />
      </div>
    );
  }
}

export default App;

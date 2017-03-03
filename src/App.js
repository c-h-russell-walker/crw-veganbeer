import React, {Component} from 'react';
import logo from './logo.svg';

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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to VeganBeer</h2>
        </div>
        <DateRetrieved retrievedTimestamp={this.state.retrievedTimestamp} />
        <Brewers retrievedTimestamp={this.state.retrievedTimestamp} />
      </div>
    );
  }
}

export default App;

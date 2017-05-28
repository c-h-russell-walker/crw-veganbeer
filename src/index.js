import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import configureStore from './store/configure-store';

import './index.css';

// Get any localStorage/sessionStorage data and use for initialState
const initialState = {
  breweries: [],
  retrievedTimestamp: self.localStorage.getItem('retrievedTimestamp'),
  currentPage: self.sessionStorage.getItem('currentPage') || 'A',
};

const store = configureStore(initialState);

store.subscribe(() => {
  let currentState = store.getState();
  self.localStorage.setItem('retrievedTimestamp', currentState.retrievedTimestamp);

  // We do not want to store an empty string as the session stored value
  if (currentState.currentPage) {
    self.sessionStorage.setItem('currentPage', currentState.currentPage);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

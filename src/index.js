import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import configureStore from './store/configure-store';

import './index.css';

// Get any localStorage data and use for initialState
const initialState = {
  retrievedTimestamp: self.localStorage.getItem('retrievedTimestamp')
};

const store = configureStore(initialState);

store.subscribe(() => {
  let currentState = store.getState();
  self.localStorage.setItem('retrievedTimestamp', currentState.retrievedTimestamp);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

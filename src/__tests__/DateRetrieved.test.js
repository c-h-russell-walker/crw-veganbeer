import React from 'react';
import ReactDOM from 'react-dom';

import DateRetrieved from '../app/DateRetrieved';
import { currentTimestamp } from '../helpers/currentTimestamp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DateRetrieved retrievedTimestamp={currentTimestamp()} />, div);
});

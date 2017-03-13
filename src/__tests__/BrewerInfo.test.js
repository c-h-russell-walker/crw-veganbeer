import React from 'react';
import ReactDOM from 'react-dom';

import BrewerInfo from '../BrewerInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrewerInfo brewerId={42} />, div);
});

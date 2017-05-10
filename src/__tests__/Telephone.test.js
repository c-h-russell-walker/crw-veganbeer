import React from 'react';
import ReactDOM from 'react-dom';

import Telephone from '../app/Telephone';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Telephone phone={'617-555-1212'} />, div);
});

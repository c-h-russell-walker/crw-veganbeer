import logo from '../logo.svg';

import React from 'react';

export default ({hidden}) => {
  return (
    <div className={hidden ? 'hidden' : ''}>
      <img src={logo} className='app-logo' alt="logo" />
      <p className='loading'>Loading</p>
    </div>
  );
};
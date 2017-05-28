import { UPDATE_BREWERIES } from '../actions/action-types';

const beerInfo = self.localStorage.getItem('beerInfo') || [];

export default (state=beerInfo, action) => {
  switch (action.type) {
    case UPDATE_BREWERIES:
      return action.breweries;
    default:
      return state;
  }
};

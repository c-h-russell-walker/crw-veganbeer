import { UPDATE_BREWERIES } from './action-types';

export const updateBreweries = (breweries) => {
  return {
    type: UPDATE_BREWERIES,
    breweries
  };
}

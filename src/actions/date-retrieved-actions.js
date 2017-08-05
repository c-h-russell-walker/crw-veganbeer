import * as types from './action-types';

export const updateDateRetrieved = (retrievedTimestamp) => {
  return {
    type: types.UPDATE_TIME_RETRIEVED,
    retrievedTimestamp
  };
};

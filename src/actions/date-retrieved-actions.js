import { UPDATE_TIME_RETRIEVED } from './action-types';

export const updateDateRetrieved = (retrievedTimestamp) => {
  return {
    type: UPDATE_TIME_RETRIEVED,
    retrievedTimestamp
  };
}

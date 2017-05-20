import * as types from '../actions/action-types';

import { currentTimestamp } from '../helpers/currentTimestamp';

const initialTimestamp = self.localStorage.getItem('retrievedTimestamp') || currentTimestamp();

export default (state=initialTimestamp, action) => {
  switch (action.type) {
    case types.UPDATE_TIME_RETRIEVED:
      return action.retrievedTimestamp;
    default:
      return state;
  }
};

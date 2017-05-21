import retrievedTimestamp from './retrieved-timestamp-reducer';
import currentPage from './current-page-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  retrievedTimestamp,
  currentPage
});

export default rootReducer;

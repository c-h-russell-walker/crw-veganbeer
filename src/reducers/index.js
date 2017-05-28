import breweries from './breweries-reducer';
import retrievedTimestamp from './retrieved-timestamp-reducer';
import currentPage from './current-page-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  breweries,
  retrievedTimestamp,
  currentPage,
});

export default rootReducer;

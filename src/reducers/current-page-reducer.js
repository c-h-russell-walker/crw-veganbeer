import { UPDATE_CURRENT_PAGE } from '../actions/action-types';

const currentPage = self.sessionStorage.getItem('currentPage') || 'A';

export default (state=currentPage, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_PAGE:
      return action.currentPage;
    default:
      return state;
  }
};

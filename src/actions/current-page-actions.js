import { UPDATE_CURRENT_PAGE } from './action-types';

export const updateCurrentPage = (currentPage) => {
  return {
    type: UPDATE_CURRENT_PAGE,
    currentPage
  };
}

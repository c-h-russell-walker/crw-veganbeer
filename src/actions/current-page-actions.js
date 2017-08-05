import * as types from './action-types';

export const updateCurrentPage = (currentPage) => {
  return {
    type: types.UPDATE_CURRENT_PAGE,
    currentPage
  };
};

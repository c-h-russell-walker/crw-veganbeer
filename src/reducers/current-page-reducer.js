import * as types from "../actions/action-types";

const currentPage = self.sessionStorage.getItem("currentPage") || "A";

export default (state = currentPage, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_PAGE:
      return action.currentPage;
    default:
      return state;
  }
};

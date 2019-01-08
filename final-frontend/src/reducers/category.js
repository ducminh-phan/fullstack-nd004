import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  SELECT_CATEGORY,
  SELECT_CATEGORY_FAILURE,
  SELECT_CATEGORY_SUCCESS,
} from '../actions/category';


export default (state = null, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return state;
    case ADD_CATEGORY_FAILURE:
      return { errorMessage: action.message };
    case SELECT_CATEGORY:
      return { ...state, selectedCategoryID: action.selectedCategoryID };
    case SELECT_CATEGORY_SUCCESS:
      return { ...state, items: action.items };
    case SELECT_CATEGORY_FAILURE:
      return { errorMessage: action.message };
    default:
      return state;
  }
};

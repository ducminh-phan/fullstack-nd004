import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  SELECT_CATEGORY,
  SELECT_CATEGORY_FAILURE,
  SELECT_CATEGORY_SUCCESS,
} from '../actions/category';
import { DELETE_ITEM_SUCCESS } from '../actions/item';


export default (state = { selectedCategoryID: 0, items: [] }, action) => {
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
    case DELETE_ITEM_SUCCESS:
      return { ...state, items: state.items.filter(item => (item.id !== action.itemId)) };
    default:
      return state;
  }
};

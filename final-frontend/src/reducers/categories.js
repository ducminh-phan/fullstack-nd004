import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_SUCCESS } from '../actions/categories';

export default (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.categories;
    case GET_CATEGORIES_FAILURE:
      return { errorMessage: action.message };
    default:
      return state;
  }
};

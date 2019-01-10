import { GET_CATEGORIES_SUCCESS } from '../actions/categories';


export default (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
};

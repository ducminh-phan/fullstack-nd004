import { authRequest, request } from '../utils/request';

export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_CATEGORY_SUCCESS = 'SELECT_CATEGORY_SUCCESS';
export const SELECT_CATEGORY_FAILURE = 'SELECT_CATEGORY_FAILURE';


export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  category,
});


export const addCategoryFailure = error => ({
  type: ADD_CATEGORY_FAILURE,
  message: error.message,
});


export const addCategory = name => dispatch => authRequest.post('/categories', { name })
  .then(category => dispatch(addCategorySuccess(category)))
  .catch(error => dispatch(addCategoryFailure(error)));


export const selectCategorySuccess = items => ({
  type: SELECT_CATEGORY_SUCCESS,
  items,
});


export const selectCategoryFailure = error => ({
  type: SELECT_CATEGORY_FAILURE,
  message: error.message,
});


export const selectCategory = categoryId => (dispatch) => {
  dispatch({
    type: SELECT_CATEGORY,
    selectedCategoryID: categoryId,
  });

  return request.get(`/categories/${categoryId}/items`)
    .then(
      response => dispatch(selectCategorySuccess(response.data)),
    )
    .catch(
      error => dispatch(selectCategoryFailure(error)),
    );
};

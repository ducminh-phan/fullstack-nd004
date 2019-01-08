import { request } from '../utils/request';


export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';


export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});


export const getCategoriesFailure = error => ({
  type: GET_CATEGORIES_FAILURE,
  message: error.message,
});


export const getCategories = () => dispatch => request.get('/categories')
  .then(
    response => dispatch(getCategoriesSuccess(response.data)),
  )
  .catch(
    error => dispatch(getCategoriesFailure(error)),
  );

import { request } from '../utils/request';
import { showAlert } from './alert';


export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';


export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});


export const getCategories = () => dispatch => request.get('/categories')
  .then(
    response => dispatch(getCategoriesSuccess(response.data)),
  )
  .catch(
    error => dispatch(showAlert('error', error.message)),
  );

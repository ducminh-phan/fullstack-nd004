import { authRequest } from '../utils/request';
import { showError } from './alert';

export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';


export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  category,
});


export const addCategory = name => dispatch => authRequest.post('/categories', { name })
  .then(category => dispatch(addCategorySuccess(category)))
  .catch(error => dispatch(showError(error)));

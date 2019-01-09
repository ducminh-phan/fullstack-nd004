import { request } from '../utils/request';
import { showError } from './alert';

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';


export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  items,
});


export const getItems = categoryId => dispatch => request.get(`/categories/${categoryId}/items`)
  .then(
    response => dispatch(getItemsSuccess(response.data)),
  )
  .catch(
    error => dispatch(showError(error)),
  );


export const getLatestItems = () => dispatch => request.get('/items')
  .then(
    response => dispatch(getItemsSuccess(response.data)),
  )
  .catch(
    error => dispatch(showError(error)),
  );

import { authRequest, request } from '../utils/request';
import { clearAlert, showAlert, showError } from './alert';

export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';


export const getItemSuccess = item => ({
  type: GET_ITEM_SUCCESS,
  item,
});


export const deleteItemSuccess = itemId => ({
  type: DELETE_ITEM_SUCCESS,
  itemId,
});


export const getItem = (categoryId, itemId) => dispatch => (
  request.get(`/categories/${categoryId}/items/${itemId}`)
    .then(response => dispatch(getItemSuccess(response.data)))
    .catch(error => dispatch(showError(error)))
);


export const addItem = (categoryId, item) => (dispatch) => {
  dispatch(clearAlert);

  return authRequest.post(`/categories/${categoryId}/items`, item)
    .then(() => {
      dispatch(showError('success', 'Item was added successfully.'));
    })
    .catch(error => dispatch(showError(error)));
};


export const deleteItem = (categoryId, itemId) => (dispatch) => {
  dispatch(clearAlert);

  return authRequest.delete(`/categories/${categoryId}/items/${itemId}`)
    .then(() => {
      dispatch(deleteItemSuccess(itemId));
      dispatch(showAlert('success', 'Item was deleted successfully.'));
    })
    .catch(error => dispatch(showError(error)));
};

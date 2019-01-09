import { authRequest, request } from '../utils/request';
import { clearAlert, showAlert } from './alert';

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';

export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  items,
});

export const getItemsFailure = error => ({
  type: GET_ITEMS_FAILURE,
  message: error.message,
});

export const getItemSuccess = item => ({
  type: GET_ITEM_SUCCESS,
  item,
});

export const getItemFailure = error => ({
  type: GET_ITEM_FAILURE,
  message: error.message,
});

export const addItemSuccess = item => ({
  type: ADD_ITEM_SUCCESS,
  item,
});

export const addItemFailure = error => ({
  type: ADD_ITEM_FAILURE,
  message: error.message,
});

export const deleteItemSuccess = itemId => ({
  type: DELETE_ITEM_SUCCESS,
  itemId,
});

export const deleteItemFailure = error => ({
  type: DELETE_ITEM_FAILURE,
  message: error.message,
});

export const getItems = categoryId => (dispatch) => {
  dispatch({ type: GET_ITEMS });

  return request.get(`/categories/${categoryId}/items`)
    .then(items => dispatch(getItemsSuccess(items)))
    .catch(error => dispatch(getItemsFailure(error)));
};

export const getItem = (categoryId, itemId) => dispatch => (
  request.get(`/categories/${categoryId}/items/${itemId}`)
    .then(item => dispatch(getItemSuccess(item)))
    .catch(error => dispatch(showAlert('error', error.message)))
);

export const addItem = (categoryId, item) => (dispatch) => {
  dispatch(clearAlert);

  return authRequest.post(`/categories/${categoryId}/items`, item)
    .then((newItem) => {
      dispatch(addItemSuccess(newItem));
      dispatch(showAlert('success', 'Item was added successfully.'));
    })
    .catch(error => dispatch(showAlert('error', error.message)));
};

export const deleteItem = (categoryId, itemId) => (dispatch) => {
  dispatch(clearAlert);

  return authRequest.delete(`/categories/${categoryId}/items/${itemId}`)
    .then(() => {
      dispatch(deleteItemSuccess(itemId));
      dispatch(showAlert('success', 'Item was deleted successfully.'));
    })
    .catch(error => dispatch(showAlert('error', error.message)));
};

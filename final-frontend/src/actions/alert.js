export const SET_ALERT = 'SET_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';


export const setAlert = (type, message) => ({
  type: SET_ALERT,
  alert: { type, message },
});


export const clearAlert = {
  type: CLEAR_ALERT,
};


export const showAlert = (type, message) => (dispatch) => {
  dispatch(setAlert(type, message));
  setTimeout(() => dispatch(clearAlert), 3000);
};


export const showError = error => (dispatch) => {
  const { message } = error.response.data;

  dispatch(setAlert('error', message));
  setTimeout(() => dispatch(clearAlert), 3000);
};

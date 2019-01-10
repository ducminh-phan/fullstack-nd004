import { authRequest } from '../utils/request';
import { showAlert, showError } from './alert';


const addCategory = name => dispatch => authRequest.post('/categories', { name })
  .then(
    () => {
      dispatch(showAlert('success', 'Item was deleted successfully.'));
    },
  )
  .catch(
    error => dispatch(showError(error)),
  );


export default addCategory;

import { CLEAR_ALERT, SET_ALERT } from '../actions/alert';


export default (state = { type: '', message: '' }, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.alert;
    case CLEAR_ALERT:
      return { ...state, message: '' };
    default:
      return state;
  }
};

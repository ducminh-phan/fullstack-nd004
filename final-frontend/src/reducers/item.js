import { GET_ITEM_SUCCESS } from '../actions/item';


export default (state = null, action) => {
  switch (action.type) {
    case GET_ITEM_SUCCESS:
      return action.item;
    default:
      return state;
  }
};

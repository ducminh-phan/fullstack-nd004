import { GET_ITEMS_SUCCESS } from '../actions/items';
import { DELETE_ITEM_SUCCESS } from '../actions/item';


export default (state = [], action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
      return action.items;
    case DELETE_ITEM_SUCCESS:
      return state.filter(item => (item.id !== action.itemId));
    default:
      return state;
  }
};

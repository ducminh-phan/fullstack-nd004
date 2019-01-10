import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';
import item from './item';
import items from './items';


const rootReducer = combineReducers({
  alert,
  auth,
  categories,
  item,
  items,
});

export default rootReducer;

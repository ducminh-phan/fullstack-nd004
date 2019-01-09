import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';
import category from './category';
import item from './item';


const rootReducer = combineReducers({
  alert,
  auth,
  categories,
  category,
  item,
});

export default rootReducer;

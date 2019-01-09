import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';
import category from './category';


const rootReducer = combineReducers({
  alert,
  auth,
  categories,
  category,
});

export default rootReducer;

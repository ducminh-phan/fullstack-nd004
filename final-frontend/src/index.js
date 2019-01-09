import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import Storage from './utils/storage';


const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger),
);


// Save authentication data in localStorage by subscribing to the Store
store.subscribe(() => {
  Storage.setAccessToken(store.getState().auth.token);
  Storage.setUser(store.getState().auth.user);
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

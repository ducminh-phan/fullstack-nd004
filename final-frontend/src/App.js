import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';


const App = () => (
  <div className="App container">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;

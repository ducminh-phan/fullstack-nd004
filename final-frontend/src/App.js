import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Header from './components/Header';


const App = () => (
  <div className="App container">
    <Header />

    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </div>
  </div>
);

export default App;

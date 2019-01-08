import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Main from './components/MainConnected';
import Header from './components/Header';
import Login from './components/Login';
import NewCategory from './components/NewCategory';


const App = () => (
  <div className="App container">
    <Header />

    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/new-category" component={NewCategory} />
        <Redirect to="/" />
      </Switch>
    </div>
  </div>
);

export default App;

import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Main from './components/Main';
import Header from './components/Header';
import Flash from './components/Flash';
import Login from './components/Login';
import NewCategory from './components/NewCategory';
import NewItem from './components/NewItem';
import { getCategories } from './actions/categories';


class App extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="App container">
        <Header />

        <Flash />

        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/new-category" component={NewCategory} />
            <Route path="/new-item" component={NewItem} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
});


// https://stackoverflow.com/questions/45056150/react-router-v4-not-working-with-redux
export default withRouter(connect(
  null,
  mapDispatchToProps,
)(App));

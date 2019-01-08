import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import ItemList from './ItemList';


class Main extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <Category />
        </div>
        <div className="col-sm-6">
          <ItemList items={[]} />
        </div>
      </div>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import Item from './Item';


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
          <Item />
        </div>
      </div>
    );
  }
}

export default Main;

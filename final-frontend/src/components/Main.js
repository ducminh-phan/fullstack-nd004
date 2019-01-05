import React, { Component } from 'react';

import { request } from '../utils/request';
import CategoryList from './CategoryList';
import ItemList from './ItemList';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      items: [],
      selectedCategoryID: 0,
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    request.get('/categories')
      .then((response) => {
        this.setState(
          {
            categories: response.data,
          },
        );
      });
  };

  getItems = (categoryID) => {
    request.get(`/categories/${categoryID}/items`)
      .then((response) => {
        this.setState(
          {
            items: response.data,
          },
        );
      });
  };

  selectCategory = (event) => {
    const categoryID = parseInt(event.currentTarget.getAttribute('category-id'), 10);
    this.setState({
      selectedCategoryID: categoryID,
    });
    this.getItems(categoryID);
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <CategoryList
            categories={this.state.categories}
            selectedCategoryID={this.state.selectedCategoryID}
            handleSelectCategory={this.selectCategory}
          />
        </div>
        <div className="col-sm-6">
          <ItemList items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default Main;

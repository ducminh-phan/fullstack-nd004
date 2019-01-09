import React from 'react';

import CategoryList from './CategoryList';
import ItemList from './ItemList';


const Main = () => (
  <div className="row">
    <div className="col-sm-6">
      <CategoryList />
    </div>
    <div className="col-sm-6">
      <ItemList />
    </div>
  </div>
);


export default Main;

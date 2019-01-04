import React from 'react';

import CategoryList from './CategoryList';


const Main = () => (
  <div className="row">
    <div className="col-sm-6">
      <CategoryList />
    </div>
    <div className="col-sm-6">
      Items
    </div>
  </div>
);

export default Main;

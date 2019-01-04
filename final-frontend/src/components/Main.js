import React from 'react';

import Header from './Header';
import CategoryList from './CategoryList';


const Main = () => (
  <div className="main">
    <Header />

    <div>
      <CategoryList />
    </div>
  </div>
);

export default Main;

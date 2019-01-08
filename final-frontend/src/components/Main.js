import React from 'react';

import Category from './Category';
import Item from './Item';


const Main = () => (
  <div className="row">
    <div className="col-sm-6">
      <Category />
    </div>
    <div className="col-sm-6">
      <Item />
    </div>
  </div>
);


export default Main;

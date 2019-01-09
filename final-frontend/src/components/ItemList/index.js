import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ItemListHead from './ItemListHeadConnected';
import ItemListBody from './ItemListBodyConnected';


const ItemList = () => (
  <div id="item">
    <ItemListHead />
    <Switch>
      <Route exact path="/categories/:categoryId" component={ItemListBody} />
    </Switch>
  </div>
);


export default ItemList;

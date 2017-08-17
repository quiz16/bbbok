import React from 'react';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';

const history = syncHistoryWithStore( browserHistory, store() );

/* App components */
import Dashboard from './modules/dashboard';
import ProductsAdd from './modules/products/product-add';
import ProductsList from './modules/products/product-list';
import ProductsAddOrder from './modules/products/product-order';

export default (
	<Router history={ history }>
		<div>
			<Route path="/products" component={ ProductsList } />
			<Route path="/products/add" component={ ProductsAdd } />
			<Route path="/products/edit/:id" component={ ProductsAdd } />
			<Route path="/products/add-order" component={ ProductsAddOrder } />
		</div>
	</Router>
);


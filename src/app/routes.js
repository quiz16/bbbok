import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import auth from './auth';

const history = syncHistoryWithStore( browserHistory, store() );

// firebase authentication listener
firebase.auth().onAuthStateChanged( user => {
	if ( !user ) {
		history.replace( {
			'pathname' : '/login'
		} );
	}
} );

/* App components */
import Login from './modules/login';
import Dashboard from './modules/dashboard';
import ProductsAdd from './modules/products/product-add';
import ProductsList from './modules/products/product-list';
import ProductsAddOrder from './modules/products/product-order';

export default (
	<Router history={ history }>
		<div>
			<Route path="/" component={ Login }>
				<IndexRedirect to="login"/>
				<Route path="login" component={ Login } onEnter={ auth.checkIfLogin }/>
			</Route>
			<Route path="/products" component={ ProductsList } onEnter={ auth.requireAuth } />
			<Route path="/products/add" component={ ProductsAdd } onEnter={ auth.requireAuth } />
			<Route path="/products/edit/:id" component={ ProductsAdd } onEnter={ auth.requireAuth } />
			<Route path="/products/add-order" component={ ProductsAddOrder } onEnter={ auth.requireAuth } />
		</div>
	</Router>
);


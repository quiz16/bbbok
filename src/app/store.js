import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

import productAddReducer from './modules/products/product-add/reducers';
import productListReducer from './modules/products/product-list/reducers';
import productOrderReducer from './modules/products/product-order/reducers';

// Initialize store
let store;

// Return a function so we can configure it
export default () => {
	if ( store ) {
		return store;
	}

	// List all reducers
	let reducers = {
		productAddReducer,
		productListReducer,
		productOrderReducer,
		'routing' : routerReducer
	};

	/** List all middlewares to add
	 * example:
	 * let plugins = [ applyMiddleware() ];
	 */
	let plugins = [
		applyMiddleware( thunk ),
		applyMiddleware( routerMiddleware( browserHistory ) )
	];

	if ( process.env.NODE_ENV === 'development' ) {
		plugins.push( DevTools.instrument() );
	}

	// Enhancers
	const enhancer = compose( ...plugins );

	// Create store
	store = createStore(
		combineReducers( reducers ),
		enhancer
	);

	// Explicit update of store when active hot-loader
	if ( module.hot ) {
		module.hot.accept( reducers, () => {
			const nextRootReducer = reducers;

			store.replaceReducer( nextRootReducer );
		} );
	}

	return store;
};


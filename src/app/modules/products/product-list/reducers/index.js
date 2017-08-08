import {
	GET_PRODUCTS,
	GET_INCOMING_ORDERS
} from '../../../../constants';
import _ from 'lodash';
// Store for reducer
const productAddState = {
	'status'   : 'initial',
	'products' : {},
	'orders'   : {}
};

export default function productListReducer ( state = productAddState, action ) {
	switch ( action.type ) {
		case GET_PRODUCTS:
			return Object.assign( {}, state, {
				'products' : action.products
			} );
		case GET_INCOMING_ORDERS:
			return Object.assign( {}, state, {
				'orders' : action.orders
			} );
		default:
			return state;
	}
}


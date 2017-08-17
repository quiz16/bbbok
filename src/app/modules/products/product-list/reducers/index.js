import {
	GET_PRODUCTS,
	GET_INCOMING_ORDERS,
	GET_ORDER_DETAILS
} from '../../../../constants';

const productAddState = {
	'products' : {},
	'orders'   : {},
	'details'  : {}
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
		case GET_ORDER_DETAILS:
			return Object.assign( {}, state, {
				'details' : action.details
			} );
		default:
			return state;
	}
}


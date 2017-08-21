import {
	GET_PRODUCTS,
	GET_INCOMING_ORDERS,
	GET_ORDER_DETAILS,
	ORDER_INCOMING_CONFIRM,
	CLEAR_INCOMING_ORDER_STATE,
	OFF
} from '../../../../constants';

const productListState = {
	'products'    : [],
	'orders'      : '',
	'details'     : {},
	'orderStatus' : 'initial',
	'orderName'   : '',
	'orderKey'    : ''
};

export default function productListReducer ( state = productListState, action ) {
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
			let obj = JSON.parse( JSON.stringify( state.details ) );

			obj[ action.key ] = action.details;

			return Object.assign( {}, state, {
				'details' : obj
			} );
		case ORDER_INCOMING_CONFIRM:
			return Object.assign( {}, state, {
				'orderStatus' : action.orderStatus,
				'orderName'   : action.orderName,
				'orderKey'    : action.key
			} );
		case CLEAR_INCOMING_ORDER_STATE:
			return Object.assign( {}, state, {
				'orderStatus' : 'initial',
				'orderName'   : '',
				'orderKey'    : ''
			} );
		case OFF:
			return Object.assign( {}, state, productListState );
		default:
			return state;
	}
}


import {
	GET_PRODUCTS,
	ADD_ORDER,
	GET_PRODUCT_DETAILS_ORDER,
	OFF
} from '../../../../constants';

const productOrderState = {
	'products' : {},
	'status'   : '',
	'details'  : {}
};

export default function productOrderReducer ( state = productOrderState, action ) {
	switch ( action.type ) {
		case GET_PRODUCTS:
			return Object.assign( {}, state, {
				'products' : action.products
			} );
		case ADD_ORDER:
			return Object.assign( {}, state, {
				'status' : action.status
			} );
		case GET_PRODUCT_DETAILS_ORDER:
			let obj = JSON.parse( JSON.stringify( state.details ) );

			obj[ action.key ] = action.details;

			return Object.assign( {}, state, {
				'details' : obj
			} );
		case OFF:
			return Object.assign( {}, state, productOrderState );
		default:
			return state;
	}
}


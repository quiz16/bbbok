import {
	GET_PRODUCTS,
	ADD_ORDER
} from '../../../../constants';
import _ from 'lodash';
// Store for reducer
const productOrderState = {
	'products' : {},
	'status'   : ''
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
		default:
			return state;
	}
}


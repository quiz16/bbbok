import {
	ADD_PRODUCT,
	CLEAR_ADD_PRODUCT_STATE
} from '../../../../constants';

const productAddState = {
	'status' : 'initial'
};

export default function productAddReducer ( state = productAddState, action ) {
	switch ( action.type ) {
		case CLEAR_ADD_PRODUCT_STATE :
			return Object.assign( {}, state, productAddState );
		case ADD_PRODUCT:
			return Object.assign( {}, state, {
				'status' : action.status
			} );
		default:
			return state;
	}
}


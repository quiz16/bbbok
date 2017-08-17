import {
	ADD_PRODUCT,
} from '../../../../constants';

const productAddState = {
	'status' : 'initial'
};

export default function productAddReducer ( state = productAddState, action ) {
	switch ( action.type ) {
		case ADD_PRODUCT:
			return Object.assign( {}, state, {
				'status' : action.status
			} );
		default:
			return state;
	}
}


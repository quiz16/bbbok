import {
	GET_DETAILS,
	OFF
} from '../../../../constants';

const productViewState = {
	'details' : {}
};

export default function productViewReducer ( state = productViewState, action ) {
	switch ( action.type ) {
		case GET_DETAILS:
			return Object.assign( {}, state, {
				'details' : action.details
			} );
		case OFF:
			return Object.assign( {}, state, productViewState );
		default:
			return state;
	}
}


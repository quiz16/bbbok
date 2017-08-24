import {
	GET_DETAILS,
	GET_HISTORY,
	OFF
} from '../../../../constants';

const productViewState = {
	'details' : {},
	'history' : {}
};

export default function productViewReducer ( state = productViewState, action ) {
	switch ( action.type ) {
		case GET_DETAILS:
			return Object.assign( {}, state, {
				'details' : action.details
			} );
		case OFF:
			return Object.assign( {}, state, productViewState );
		case GET_HISTORY:
			return Object.assign( {}, state, {
				'history' : action.history
			} );
		default:
			return state;
	}
}


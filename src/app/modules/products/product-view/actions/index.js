import {
	GET_DETAILS,
	GET_HISTORY,
	OFF
} from '../../../../constants';

export function getProduct ( key ) {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'List' ).child( key );

			ref.on( 'value', snap => {
				dispatch( {
					'type' : GET_DETAILS,
					'details' : snap.val()
				} );
			} );

		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function getHistory ( key ) {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'History' ).child( key );

			ref.on( 'value', snap => {
				dispatch( {
					'type'    : GET_HISTORY,
					'history' : snap.val()
				} );
			} );
		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function offListener ( keyPar, key ) {
	firebase.database().ref( 'Products' ).child( keyPar ).child( key ).off();
	return {
		'type' : OFF
	};
}


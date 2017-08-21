import {
	GET_DETAILS,
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

export function offListener ( key ) {
	firebase.database().ref( 'Products' ).child( 'List' ).child( key ).off();
	return {
		'type' : OFF
	};
}


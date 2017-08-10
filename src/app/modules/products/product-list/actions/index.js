import {
	GET_PRODUCTS,
	GET_INCOMING_ORDERS,
	GET_ORDER_DETAILS
} from '../../../../constants';
import * as firebase from 'firebase';

export function getProducts () {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'List' );

			ref.on( 'value', snap => {
				dispatch( {
					'type' : GET_PRODUCTS,
					'products' : snap
				} );
			} );

		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function getIncomingOrders () {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'Order-index' );

			ref.on( 'value', snap => {
				dispatch( {
					'type' : GET_INCOMING_ORDERS,
					'orders' : snap
				} );
			} );

		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function getOrderDetails( key ) {
	return async dispatch => {
		try {
			const ref   = firebase.database().ref( 'Products' );
			let details = {};

			ref.child( 'Order-add/' + key ).once( 'value', snap => {
				let keys    = _.keys( snap.val() );
				let promise = [];

				details[ key ] = [];

				keys.forEach( ( indexKey, index ) => {
					promise.push( ref.child( 'Index/' + indexKey).once( 'value' ) );
				} )

				Promise.all( promise ).then( response => {
					response.map( ( dataSnap, index ) => {
						details[ key ].push( {
							'quantity' : snap.val()[ keys[ index ] ],
							'name' : dataSnap.val().name
						} );
					} );
					dispatch( {
						'type' : GET_ORDER_DETAILS,
						details
					} );
				} );
			} );
		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function confirmOrder ( key ) {
	return async dispatch => {
		try {
			/* TODO: add confirm order */
		} catch ( error ) {
			/* Do something with error */
		}
	};
}


import {
	GET_PRODUCTS,
	GET_INCOMING_ORDERS,
	GET_ORDER_DETAILS,
	ORDER_INCOMING_CONFIRM,
	CLEAR_INCOMING_ORDER_STATE,
	OFF
} from '../../../../constants';

export function getProducts () {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'Index' );

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
			const ref = firebase.database().ref( 'Products' );

			ref.child( 'Order-add/' + key ).once( 'value', snap => {
				const details = snap.val();
				let keys      = Object.keys( details );

				keys.map( data => {
					ref.child( 'Index/' + data ).once( 'value' ).then( res => {
						details[ data ][ 'total_quantity' ] = ( +res.val().quantity + +details[ data ].quantity ).toString();
					} );
				} );

				dispatch( {
					'type' : GET_ORDER_DETAILS,
					details,
					key
				} );
			} );
		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function confirmOrder ( key, body, details ) {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' );
			let keys  = Object.keys( details );

			ref.child( 'Order-done' ).child( key ).set( body );
			ref.child( 'Order-index' ).child( key ).remove();

			keys.map( data => {
				let obj = { 'quantity' : details[ data ].total_quantity };

				ref.child( 'List/' + data ).update( obj );
				ref.child( 'Index/' + data ).update( obj );

				obj.initiator  = 'incoming_order';
				obj.name       = details[ data ].name;
				obj.date_added = body.date_confirmed;

				ref.child( 'History/' + data ).push( obj );
			} );

			dispatch( {
				'type'        : ORDER_INCOMING_CONFIRM,
				'orderStatus' : 'success',
				'orderName'   : 'Order ' + body.date_added,
				key
			} );
		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function clearState ( key ) {
	return {
		'type' : CLEAR_INCOMING_ORDER_STATE,
		key
	};
}

export function offListener ( key ) {
	firebase.database().ref( 'Products' ).child( 'List' ).child( key ).off();
	return {
		'type' : OFF
	};
}

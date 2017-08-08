import {
	GET_PRODUCTS,
	GET_INCOMING_ORDERS
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

function checkOrderExist ( key ) {
	return new Promise ( ( resolve, reject ) => {
		const ref = firebase.database().ref( 'Products' );
		let orderAddRef = ref.child( 'Order-add' );

		orderAddRef.child( key ).once( 'value' )
			.then( snap => {
				if ( snap.exists() ) {
					resolve( snap.val().quantity );
				}
				reject();
			}, () => {
				reject();
			} );
	} );
}

export function addOrder ( key ) {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' );

			let quantity = await checkOrderExist( key );

			console.log( quantity );

					//orderAddRef.once( 'value' ).then( snap => {
						//console.log( snap.exists() );
					//} );
			ref.child( 'Index/' + key ).once( 'value' )
				.then( snap => {
					let orderAddRef = ref.child( 'Order-add' );

					//orderAddRef.once( 'value' ).then( snap => {
						//if ( snap.hasChild( key ) ) {
						//}
					//} );
					//orderAddRef.child( key ).set( {
						//'name' : snap.val().name,
						//'quantity' : 1
					//} );
				} );

		} catch ( error ) {
			/* Do something with error */
		}
	};
}


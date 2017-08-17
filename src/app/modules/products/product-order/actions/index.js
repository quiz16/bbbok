import {
	GET_PRODUCTS,
	ADD_ORDER,
	GET_PRODUCT_DETAILS_ORDER
} from '../../../../constants';
import resources from '../resources';

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

export function addOrder ( order, data ) {
	return async dispatch => {
		try {

			let key = await resources.addOrder( order );

			await resources.addOrderIndex( {
				'total_price' : data.total,
				'date_added'  : data.date
			}, key );

			dispatch( {
				'type' : ADD_ORDER,
				'status' : 'success'
			} );
		} catch ( error ) {
			/* Do something with error */
		}
	};
}

export function saveQuantity ( body ) {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'Order-add' );

			let updates = {};

			updates[ body.key ] = {
				'name'     : body.name,
				'quantity' : body.quantity
			};
			ref.update( updates );
		} catch ( error ) {
			/* Do something with errror */
		}
	};
}

export function getProductDetails ( key ) {
	return async dispatch => {
		try {
			const ref = firebase.database().ref( 'Products' ).child( 'List' ).child( key );

			ref.once( 'value' ).then( snap => {
				dispatch( {
					'type'    : GET_PRODUCT_DETAILS_ORDER,
					'details' : snap.val(),
					key
				} );
			} );
		} catch ( error ) {
			/* Do something with error */
		}
	};
}


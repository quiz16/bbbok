import * as firebase from 'firebase';
import '../../../../config';
import _ from 'lodash';

export default {

	addOrder ( order ) {
		return new Promise ( ( resolve, reject ) => {

			const ref = firebase.database().ref( 'Products' ).child( 'Order-add' ).push( order );

			if ( ref ) {
				return resolve( ref.key );
			}

			reject( 'Add failed' );
		} );
	},

	addOrderIndex ( indexData, key ) {
		return new Promise ( resolve => {
			const ref = firebase.database().ref( 'Products' );

			console.log( indexData );
			ref.child( 'Order-index' ).child( key ).set( indexData );
			resolve( 'Success' );
		} );
	},
};

import * as firebase from 'firebase';
import '../../../../config';
import _ from 'lodash';

export default {

	addProduct ( product ) {
		return new Promise ( ( resolve, reject ) => {
			const ref = firebase.database().ref( 'Products' ).child( 'List' ).push( product );

			if ( ref ) {
				return resolve( ref.key );
			}

			reject( 'Add failed' );
		} );
	},

	addProductIndex ( indexData, key ) {
		return new Promise ( resolve => {
			const ref = firebase.database().ref( 'Products' );

			ref.child( 'Index' ).child( key ).set( indexData );
			resolve( 'Success' );
		} );
	},

	addProductCategory ( catData, key ) {
		return new Promise ( resolve => {
			const ref   = firebase.database().ref( 'Products' );
			let prodCat = catData.category;
			let holder  = {
				'0' : 'Face',
				'1' : 'Body'
			};

			_.omit( catData, [ 'category' ] );

			ref.child( 'Category' ).child( holder[ prodCat ] ).child( key ).set( catData );
			resolve( 'Success' );
		} );
	}

};

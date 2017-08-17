import '../../../../config';

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

			delete catData.category;

			ref.child( 'Category' ).child( holder[ prodCat ] ).child( key ).set( catData );
			resolve( 'Success' );
		} );
	},

	addProductHistory ( histData, key ) {
		return new Promise ( resolve => {
			const ref = firebase.database().ref( 'Products' );

			ref.child( 'History/' + key ).push( histData );
			resolve( 'Success' );
		} );
	}

};

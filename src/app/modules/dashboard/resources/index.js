import '../../../config';

export default {

	addProduct ( product ) {

		const ref = firebase.database().ref( 'products' );
		const key = ref.push().key;

		let updates = {};

		updates[ key ] = {
			'name' : product
		};

		ref.update( updates );

		//ref.on( 'value', item => {
			//console.log( item.val() );
			//test.innerText = item.val().name;
		//} );
	}

};

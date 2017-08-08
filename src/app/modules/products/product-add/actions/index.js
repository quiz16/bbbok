import {
	ADD_PRODUCT
} from '../../../../constants';
import resources from '../resources';

export function addProduct ( body ) {
	return async dispatch => {
		try {
			let key = await resources.addProduct( body )

			await resources.addProductIndex( {
				'name'         : body.name,
				'last_updated' : body.last_updated
			}, key );

			await resources.addProductCategory( {
				'name'         : body.name,
				'category'     : body.category,
				'last_updated' : body.last_updated
			}, key );

			dispatch( {
				'type'   : ADD_PRODUCT,
				'status' : 'success'
			} );

		} catch ( error ) {
			/* Do something with error */
		}
	};
}


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

			await resources.addProductHistory( {
				'name'           : body.name,
				'quantity'       : body.quantity,
				'retail'         : body.retail,
				'reseller_price' : body.reseller_price,
				'initiator'      : 'product_add',
				'date_added'     : body.date_added
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


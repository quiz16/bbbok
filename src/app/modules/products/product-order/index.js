import React from 'react';
import { connect } from 'react-redux';
import resources from './resources';

import Header from '../../../layouts/header';
import OrderProduct from './components/order-product.js';

export class AddProductOrder extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<Header title="Add Products" />
				<OrderProduct />
			</div>
		);
	}
}

export function mapsStateToProps ( state ) {
	return {
	};
}

export function mapsDispatchToProps ( dispatch ) {
	return {
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( AddProductOrder );


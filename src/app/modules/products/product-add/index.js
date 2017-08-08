import React from 'react';
import { connect } from 'react-redux';
import resources from './resources';

import Header from '../../../layouts/header';
import AddProduct from './components/add-product.js';

export class AddProducts extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<Header title="Add Products" />
				<AddProduct />
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

export default connect( mapsStateToProps, mapsDispatchToProps )( AddProducts );


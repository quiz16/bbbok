import React from 'react';
import { connect } from 'react-redux';

import Header from '../../../layouts/header';
import ProductDetails from './components/details-product.js';

import {
	Tabs,
	Tab
} from 'material-ui/Tabs';

export class ProductView extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'tabValue' : 'details'
		} );
	}

	handleTabChange ( value ) {
		this.setState( {
			'tabValue' : value
		} );
	}

	render () {
		return (
			<div>
				<Header title="View Product" />
				<div className="product-view-wrapper">
					<Tabs value={ this.state.tabValue } onChange={ this.handleTabChange.bind( this ) }>
						<Tab label="Product Details" value="details">
							<ProductDetails id={ this.props.params.id } />
						</Tab>
						<Tab label="History" value="history">
							temporary history
						</Tab>
					</Tabs>
				</div>
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

export default connect( mapsStateToProps, mapsDispatchToProps )( ProductView );


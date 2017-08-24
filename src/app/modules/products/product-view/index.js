import React from 'react';
import { connect } from 'react-redux';

import Header from '../../../layouts/header';
import ProductDetails from './components/details-product.js';
import ProductHistory from './components/history-product.js';

import {
	Tabs,
	Tab
} from 'material-ui/Tabs';

import {
	getHistory,
} from './actions';

export class ProductView extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.isclick = false;
		this.setState( {
			'tabValue' : 'details'
		} );
	}

	handleTabChange ( value ) {
		this.setState( {
			'tabValue' : value
		} );
	}

	handleActive ( tab ) {
		if ( !this.isclick ) {
			this.props.getHistory( this.props.params.id );
			this.isclick = true;
		}
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
						<Tab label="History" value="history" onActive={ this.handleActive.bind( this, 'history' ) }>
							<ProductHistory history={ this.props.history } id={ this.props.params.id } />
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

export function mapsStateToProps ( state ) {
	return {
		'history' : state.productViewReducer.history
	};
}

export function mapsDispatchToProps ( dispatch ) {
	return {
		getHistory ( key ) {
			dispatch( getHistory( key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( ProductView );


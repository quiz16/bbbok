import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from '../../../layouts/header';
import ProductList from './components/list-product.js';
import ProductOrders from './components/incoming-order.js';

import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';


export class ListProducts extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'tabValue' : 'all'
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
				<Header title="Product List" />
				<div className="product-list-wrapper">
					<Tabs value={ this.state.tabValue } onChange={ this.handleTabChange.bind( this ) }>
						<Tab label="All" value="all">
							<ProductList />
						</Tab>
						<Tab label="Incoming" value="incoming">
							<ProductOrders />
						</Tab>
					</Tabs>
				</div>
				<RaisedButton label="Add" onTouchTap={ () => { this.props.goTo( '/products/add' ) } } />
				<RaisedButton label="Order" onTouchTap={ () => { this.props.goTo( '/products/add-order' ) } } />
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
		goTo ( url ) {
			dispatch( push( url ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( ListProducts );



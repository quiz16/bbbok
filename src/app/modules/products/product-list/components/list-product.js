import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

import {
	getProducts,
	addOrder
} from '../actions';

export class ListProduct extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.tableHeaders = [ 'Name', 'Quantity', 'Price', 'Category', 'Updated By', 'Date Added', 'Date Updated', 'Actions' ];

		this.setState( {
			'name'             : '',
			'quantity'         : '',
			'price'            : '',
			'category'         : '',
			'change_by'        : '',
			'last_updated'     : null,
			'openSnack'        : false,
			'autoHideDuration' : 4000,
			'tempName'         : ''
		} );

		this.props.getProducts();
	}

	onChange ( key ) {
		return ( e ) => {
			let state = JSON.parse( JSON.stringify( this.state ) );

			state[ key ] = e.target.value;

			this.setState( state );
		}
	}

	handleRequestClose () {
		this.setState( {
			'openSnack' : false
		} );
	}

	handleOrder () {
		console.log( this );
	}

	render () {
		let headers  = [];
		let rows     = [];
		let category = [];

		this.tableHeaders.map( ( item, index ) => {
			headers.push( <TableHeaderColumn key={ index }>{ item }</TableHeaderColumn> );
		} );

		if ( Object.keys( this.props.products ).length ) {
			this.props.products.forEach( snap => {
				let data = snap.val();

				rows.push(
					<TableRow key={ snap.key }>
						<TableRowColumn>{ data.name }</TableRowColumn>
						<TableRowColumn>{ data.quantity }</TableRowColumn>
						<TableRowColumn>{ data.reseller_price }</TableRowColumn>
						<TableRowColumn>{ data.category ? 'Body' : 'Face' }</TableRowColumn>
						<TableRowColumn>{ data.change_by }</TableRowColumn>
						<TableRowColumn>{ data.date_added }</TableRowColumn>
						<TableRowColumn>{ data.last_updated }</TableRowColumn>
						<TableRowColumn>
							<IconButton tooltip="Edit" tooltipPosition="top-center" iconClassName="material-icons" onTouchTap={ () => this.props.goToEdit( snap.key ) } >edit</IconButton>
							<Badge
								badgeContent={10}
								secondary={true}
								badgeStyle={{top: 12, right: 12}}
							>
								<IconButton tooltip="Order" tooltipPosition="top-center" iconClassName="material-icons" onTouchTap={ () => this.props.addOrder( snap.key ) } >add_shopping_cart</IconButton>
							</Badge>
						</TableRowColumn>
					</TableRow>
				);
			} );
		}

		return (
			<Paper zDepth={2}>
				<Table multiSelectable={ true }>
					<TableHeader>
						<TableRow children={ headers }></TableRow>
					</TableHeader>
					<TableBody>
						{ rows }
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'products' : state.productListReducer.products
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		getProducts () {
			dispatch( getProducts() );
		},

		goToEdit ( key ) {
			dispatch( push( '/products/edit/' + key ) );
		},

		addOrder ( key ) {
			dispatch( addOrder( key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( ListProduct );

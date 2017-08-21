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
import RefreshIndicator from 'material-ui/RefreshIndicator';
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
		this.tableHeaders = [ 'Name', 'Quantity', 'Price' ];

		this.setState( {
			'refresh' : 'loading'
		} );

		this.props.getProducts();
	}

	componentWillReceiveProps( nextProps ) {
		if ( typeof nextProps.products === 'object' ) {
			this.setState( {
				'refresh' : 'hide'
			} );
		}
	}

	onChange ( key ) {
		return ( e ) => {
			let state = JSON.parse( JSON.stringify( this.state ) );

			state[ key ] = e.target.value;

			this.setState( state );
		}
	}

	handleRowSelect ( row ) {
		let key = Object.keys( this.props.products.val() )[ row[ 0 ] ];

		return this.props.goToView( key );
	}

	handleOrder () {
		console.log( this );
	}

	render () {
		let headers  = [];
		let rows     = [];
		let category = [];
		let styles   = {
			'table' : {
				'body' : {
					'maxHeight' : '550px',
					'minHeight' : '58px'
				},
				'style' : {
					'textAlign' : 'center'
				}
			},
			'spinner' : {
				'style' : {
					'boxShadow'  : 'none',
					'marginLeft' : '50%'
				},
				'loadingColor' : 'rgb(255, 64, 129)'
			},
		};

		this.tableHeaders.map( ( item, index ) => {
			headers.push( <TableHeaderColumn key={ index } style={ styles.table.style }>{ item }</TableHeaderColumn> );
		} );

		if ( Object.keys( this.props.products ).length ) {
			this.props.products.forEach( snap => {
				let data = snap.val();

				rows.push(
					<TableRow key={ snap.key }>
						<TableRowColumn style={ styles.table.style }>{ data.quantity }</TableRowColumn>
						<TableRowColumn style={ styles.table.style }>{ data.name }</TableRowColumn>
						<TableRowColumn style={ styles.table.style }>{ data.reseller_price }</TableRowColumn>
					</TableRow>
				);
			} );
		}

		return (
			<Paper zDepth={2}>
				<Table
					selectable={ true }
					bodyStyle={ styles.table.body }
					onRowSelection={ this.handleRowSelect.bind( this ) }
					fixedHeader={ true }>
					<TableHeader
						displaySelectAll={ false }
						adjustForCheckbox={ false }>
							<TableRow children={ headers }></TableRow>
					</TableHeader>
					<TableBody
						displayRowCheckbox={ false }
						stripedRows={ true }>
						{ rows }
					</TableBody>
				</Table>
				<RefreshIndicator
					size={ 50 }
					left={ -25 }
					top={ 60 }
					loadingColor={ styles.spinner.loadingColor }
					status={ this.state.refresh }
					style={ styles.spinner.style }
				/>
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

		goToView ( key ) {
			dispatch( push( '/products/view/' + key ) );
		},

		addOrder ( key ) {
			dispatch( addOrder( key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( ListProduct );

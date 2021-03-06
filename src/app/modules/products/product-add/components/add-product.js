import React from 'react';
import { connect } from 'react-redux';
import { dateFormat } from '../../../../helper';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import {
	addProduct,
	clearState
} from '../actions';
export class AddProduct extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.productCat = [ 'Face', 'Body' ];

		this.setState( {
			'name'             : '',
			'quantity'         : '',
			'retail'           : '',
			'reseller'         : '',
			'category'         : null,
			'change_by'        : '',
			'last_updated'     : null,
			'openSnack'        : false,
			'autoHideDuration' : 4000,
			'tempName'         : ''
		} );
	}

	componentWillReceiveProps ( nextProps ) {
		if ( nextProps.status === 'success' ) {
			this.props.clearState();
			this.setState( {
				'name'      : '',
				'quantity'  : '',
				'reseller'  : '',
				'retail'    : '',
				'category'  : null,
				'openSnack' : true
			} );
		}
	}

	handleAdd () {
		let body = {
			'name'           : this.state.name,
			'quantity'       : this.state.quantity,
			'retail'         : this.state.retail,
			'reseller_price' : this.state.reseller,
			'category'       : this.state.category,
			'change_by'      : '13sdf', // user key
			'last_updated'   : dateFormat(),
			'date_added'     : dateFormat()
		};

		this.setState( {
			'tempName' : body.name
		} );

		this.props.addProduct( body );
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

	handleCategory ( index, category ) {
		this.setState( { category } );
	}

	render () {
		let styles = {
			'selectField' : {
				'underline' : {
					'display' : 'none'
				},
				'style' : {
					'width' : '100%'
				}
			}
		};

		let messageSnack = this.state.tempName + ' Added';
		let category = [];

		this.productCat.map( ( item, index ) => {
			category.push( <MenuItem key={ index } value={ index } primaryText={ item } /> );
		} );

		return (
			<div className="product-add-wrapper">
				<Paper zDepth={2}>
					<div className="product-form-wrapper">
						<TextField hintText="Name" value={ this.state.name } onChange={ this.onChange( 'name' ) } fullWidth={ true } underlineShow={ false } />
						<Divider />
						<TextField hintText="Reseller's Price" value={ this.state.reseller } onChange={ this.onChange( 'reseller' ) } fullWidth={ true } underlineShow={ false } />
						<Divider />
						<TextField hintText="Retail Price" value={ this.state.retail } onChange={ this.onChange( 'retail' ) } fullWidth={ true } underlineShow={ false } />
						<Divider />
						<SelectField floatingLabelText="Category" value={ this.state.category } onChange={ this.handleCategory.bind( this ) } underlineStyle={ styles.selectField.underline } style={ styles.selectField.style }>
							{ category }
						</SelectField>
						<Divider />
						<TextField hintText="Quantity" value={ this.state.quantity } onChange={ this.onChange( 'quantity' ) } fullWidth={ true } underlineShow={ false } />
						<Divider />

						<RaisedButton className="product-form-footer" label="Save Product" onTouchTap={ this.handleAdd.bind( this ) } fullWidth={ true } />
						<Snackbar
							open={ this.state.openSnack }
							message={ messageSnack }
							autoHideDuration={ this.state.autoHideDuration }
							onRequestClose={ this.handleRequestClose.bind( this ) } />
					</div>
				</Paper>
			</div>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'status' : state.productAddReducer.status
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		addProduct ( body ) {
			dispatch( addProduct( body ) );
		},

		clearState () {
			dispatch( clearState() );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( AddProduct );

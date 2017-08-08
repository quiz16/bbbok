import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import {
	addProduct
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
			'price'            : '',
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
			this.setState( {
				'name'      : '',
				'quantity'  : '',
				'price'     : '',
				'category'  : null,
				'openSnack' : true
			} );
		}
	}

	handleAdd () {
		let body = {
			'name'         : this.state.name,
			'quantity'     : this.state.quantity,
			'price'        : this.state.price,
			'category'     : this.state.category,
			'change_by'    : '13sdf', // user key
			'last_updated' : moment().format( 'YYYY-MM-DD HH:mm' ),
			'date_added'   : moment().format( 'YYYY-MM-DD HH:mm' )
		};

		this.setState( {
			'tempName' : body.name
		} );

		this.props.addProduct( body );
	}

	onChange ( key ) {
		return ( e ) => {
			let state = _.cloneDeep( this.state );

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
						<TextField hintText="Price" value={ this.state.price } onChange={ this.onChange( 'price' ) } fullWidth={ true } underlineShow={ false } />
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
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( AddProduct );

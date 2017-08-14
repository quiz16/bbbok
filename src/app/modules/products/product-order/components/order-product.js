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
import IconButton from 'material-ui/IconButton';
import { pinkA200 } from 'material-ui/styles/colors';
import {
	List,
	ListItem
} from 'material-ui/List';

import {
	getProducts,
	addOrder
} from '../actions';
export class AddProduct extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.productCat = [ 'Face', 'Body' ];

		this.setState( {
			'openSnack'        : false,
			'autoHideDuration' : 4000,
			'showQuantity'     : {},
			'quantity'         : {},
			'isAdded'          : {},
			'error'            : {}

		} );

		this.props.getProducts();
	}

	componentWillReceiveProps ( nextProps ) {
		if ( nextProps.status === 'success' ) {
			this.setState( {
				'openSnack' : true
			} );
		}
	}

	handleAdd () {
		let self  = this;
		let state = _.cloneDeep( self.state );
		let keys  = _.keys( state.isAdded );
		let order = {};
		let date  = moment().format( 'YYYY-MM-DD HH:mm' );

		keys.map( key => {
			if ( !state.quantity[ key ] ) {
				state.error[ key ] = 'This field is required';
				self.setState( state );
				return;
			}
			delete state.error[ key ]
			self.setState( state );

			order[ key ] = state.quantity[ key ];
		} );

    this.props.addOrder( order, date );
	}

	handleChangeQuantity ( key ) {
		return ( e ) => {
			let state = _.cloneDeep( this.state );

			state.quantity[ key ] = e.target.value;

			this.setState( state );
		}
	}

	handleRequestClose () {
		this.setState( {
			'openSnack' : false
		} );
	}

	handleAddToCart ( key ) {
		let state = _.cloneDeep( this.state );

		state.showQuantity[ key ] = !state.showQuantity[ key ];
		state.isAdded[ key ]      = true;
		this.setState( state );
	}

	render () {
		let styles = {
			'textField' : {
				'label' : {
					'bottom' : '-2px'
				},
				'style' : {
					'height' : '14px'
				},
				'input' : {
					'height' : '18px'
				},
				'underline' : {
					'bottom' : 'none'
				}
			}
		};

		let messageSnack = 'Order Added';
		let products     = [];
		let category     = [];

		if ( this.props.products.node_ ) {
			this.props.products.forEach( snap => {
				let data     = snap.val();
				let cartIcon = <IconButton
					key={ snap.key }
					iconStyle={ this.state.showQuantity[ snap.key ] ? { 'color' : pinkA200 } : {} }
					iconClassName="material-icons"
					onTouchTap={ () => this.handleAddToCart( snap.key ) }>add_shopping_cart</IconButton>;

				let displaySecond = [ <ListItem key={ snap.key } disabled={ true }>
					<TextField
						hintText="Quantity"
						hintStyle={ styles.textField.label }
						style={ styles.textField.style }
						inputStyle={ styles.textField.input }
						underlineStyle={ styles.textField.underline }
						errorText={ this.state.error[ snap.key ] }
						errorStyle={{ 'bottom' : '-3px' }}
						onChange={ this.handleChangeQuantity( snap.key ) } />
				</ListItem> ];

				products.push(
					<ListItem
						key={ snap.key }
						primaryText={ data.name }
						rightIconButton={ cartIcon }
						open={ this.state.showQuantity[ snap.key ] }
						nestedItems={ displaySecond }
						onTouchTap={ () => this.handleAddToCart( snap.key ) } />
				);
			} );
		}

		this.productCat.map( ( item, index ) => {
			category.push( <MenuItem key={ index } value={ index } primaryText={ item } /> );

		} );

		return (
			<div className="product-order-wrapper">
				<Paper zDepth={2}>
					<div className="product-order-body">
						<List>{ products }</List>
						<RaisedButton className="product-form-footer" label="Save Order" onTouchTap={ this.handleAdd.bind( this ) } fullWidth={ true } />
					</div>
				</Paper>
				<Snackbar
					open={ this.state.openSnack }
					message={ messageSnack }
					autoHideDuration={ this.state.autoHideDuration }
					onRequestClose={ this.handleRequestClose.bind( this ) } />
			</div>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'products' : state.productOrderReducer.products,
		'status' : state.productOrderReducer.status
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		getProducts () {
			dispatch( getProducts() );
		},

		addOrder ( order, date ) {
			dispatch( addOrder( order, date ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( AddProduct );

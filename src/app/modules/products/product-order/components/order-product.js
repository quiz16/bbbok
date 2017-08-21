import React from 'react';
import { connect } from 'react-redux';
import {
	numberFormat,
	dateFormat
} from '../../../../helper';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { pinkA200 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
	List,
	ListItem
} from 'material-ui/List';

import {
	getProducts,
	addOrder,
	getProductDetails
} from '../actions';
export class AddProduct extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'openSnack'        : false,
			'autoHideDuration' : 4000,
			'showQuantity'     : {},
			'quantity'         : {},
			'isAdded'          : {},
			'openDialog'       : false,
			'orderSummary'     : '',
			'error'            : {},
			'disableSave'      : true,
			'refresh'          : 'loading'
		} );

		this.props.getProducts();
	}

	componentWillReceiveProps ( nextProps ) {
		if ( nextProps.status === 'success' ) {
			this.setState( {
				'openSnack'  : true,
				'openDialog' : false
			} );
		}

		if ( typeof nextProps.products === 'object' ) {
			this.setState( {
				'refresh' : 'hide'
			} );
		}
	}

	handleAdd () {
		let self         = this;
		let state        = JSON.parse( JSON.stringify( this.state ) );
		let keys         = Object.keys( state.isAdded );
		let order        = {};
		let total        = 0;
		let totalQuan    = 0;
		let orderSummary = [];

		keys.map( key => {
			if ( !+state.quantity[ key ] ) {
				state.error[ key ]        = 'This field is required';
				state.showQuantity[ key ] = true; // open the dropdown
				self.setState( state );
				return;
			}

			const details     = this.props.details[ key ];
			const price       = +state.quantity[ key ] * details.retail;
			const textPrice   = <span className="product-dialog-price">Php { numberFormat( price ) }</span>;
			const quanLabel   = +state.quantity[ key ] > 1 ? 'pieces' : 'piece';
			const primaryText = details.name + ' - ' + state.quantity[ key ] + ' ' + quanLabel;

			delete state.error[ key ]
			self.setState( state );

			order[ key ] = {
				'name'     : details.name,
				'quantity' : state.quantity[ key ]
			};

			total     += price;
			totalQuan += +state.quantity[ key ];

			orderSummary.push(
				<ListItem
					key={ key }
					primaryText={ primaryText }
					rightIcon={ textPrice } />
			);
		} );

		if ( !Object.keys( state.error ).length ) {
			orderSummary.push(
				<ListItem
					key={ 0 }
					primaryText={ 'Total - ' + totalQuan + ' pieces' }
					rightIcon={ <span className="product-dialog-price">Php { numberFormat( total ) }</span> } />
			);

			this.setState( {
				'openDialog' : true,
				orderSummary,
				order,
				total
			} );
		}
	}

	handleChangeQuantity ( key ) {
		return ( e ) => {
			let state = JSON.parse( JSON.stringify( this.state ) );

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
		let state = JSON.parse( JSON.stringify( this.state ) );

		state.showQuantity[ key ] = !state.showQuantity[ key ];
		state.isAdded[ key ]      = true;
		state.disableSave         = false;
		this.setState( state );
		this.props.getProductDetails( key );
	}

	handleDialogClose () {
		this.setState( {
			'openDialog' : false
		} );
	}

	handleDialogConfirm () {
		let date = dateFormat();

		this.props.addOrder( this.state.order, {
			'total' : this.state.total,
			date
		} );
	}

	render () {
		const styles = {
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
			},
			'spinner' : {
				'style' : {
					'boxShadow'  : 'none',
					'marginLeft' : '50%'
				},
				'loadingColor' : 'rgb(255, 64, 129)'
			},
		};

		const actions = [
			<FlatButton
				label="Cancel"
				primary={ true }
				onTouchTap={ this.handleDialogClose.bind( this ) } />,
			<FlatButton
				label="Submit"
				primary={ true }
				keyboardFocused={ true }
				onTouchTap={ this.handleDialogConfirm.bind( this ) } />
		];

		let messageSnack = 'Order Added';
		let products     = [];

		if ( Object.keys( this.props.products ).length ) {
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

		return (
			<div className="product-order-wrapper">
				<Paper zDepth={2}>
					<div className="product-order-body">
						<div className="products-wrapper">
							<List>{ products }</List>
							<RefreshIndicator
								size={ 50 }
								left={ -25 }
								top={ 0 }
								loadingColor={ styles.spinner.loadingColor }
								status={ this.state.refresh }
								style={ styles.spinner.style }
							/>
						</div>
						<RaisedButton
							className="product-form-footer"
							label="Save Order"
							fullWidth={ true }
							disabled={ this.state.disableSave }
							onTouchTap={ this.handleAdd.bind( this ) }
						/>
					</div>
				</Paper>
				<Snackbar
					open={ this.state.openSnack }
					message={ messageSnack }
					autoHideDuration={ this.state.autoHideDuration }
					onRequestClose={ this.handleRequestClose.bind( this ) } />
				<Dialog
					title="Order Summary"
					actions={ actions }
					open={ this.state.openDialog }
					onRequestClose={ this.handleDialogClose.bind( this ) }>
						<List>{ this.state.orderSummary }</List>
					</Dialog>
			</div>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'products' : state.productOrderReducer.products,
		'details'  : state.productOrderReducer.details,
		'status'   : state.productOrderReducer.status
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		getProducts () {
			dispatch( getProducts() );
		},

		addOrder ( order, date ) {
			dispatch( addOrder( order, date ) );
		},

		getProductDetails ( key ) {
			dispatch( getProductDetails( key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( AddProduct );

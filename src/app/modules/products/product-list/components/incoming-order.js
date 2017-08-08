import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import {
	List,
	ListItem
} from 'material-ui/List';

import {
	getIncomingOrders
} from '../actions';

export class IncomingOrder extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'name'             : '',
			'quantity'         : '',
			'price'            : '',
			'category'         : '',
			'change_by'        : '',
			'last_updated'     : null,
			'openSnack'        : false,
			'autoHideDuration' : 4000,
			'tempName'         : '',
			'showOrder' : {}
		} );

		this.props.getIncomingOrders();
	}

	componentWillReceiveProps ( nextProps ) {
		if ( nextProps.status === 'success' ) {
			this.setState( {
				'name'      : '',
				'quantity'  : '',
				'price'     : '',
				'openSnack' : true
			} );
		}
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

	showOrderDetails ( key ) {
		console.log( this );
	}

	render () {
		let orders = [];
		let nestedItems = []

		if ( this.props.orders.node_ ) {
			this.props.orders.forEach( snap => {
				let data = snap.val();
				let primaryText = 'Order ' + data.date_added;

				orders.push(
					<ListItem
						key={ snap.key }
						primaryText={ primaryText }
						open={ this.state.showOrder[ snap.key ] }
						nestedItems={ nestedItems }
						onTouchTap={ () => this.showOrderDetails( snap.key ) } />
				);
			} );
		}
		return (
			<Paper zDepth={2}>
				<List>{ orders }</List>
			</Paper>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'orders' : state.productListReducer.orders
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		getIncomingOrders () {
			dispatch( getIncomingOrders() );
		},

		goToEdit ( key ) {
			dispatch( push( '/products/edit/' + key ) );
		},

		addOrder ( key ) {
			dispatch( addOrder( key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( IncomingOrder );

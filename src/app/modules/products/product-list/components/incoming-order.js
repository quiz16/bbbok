import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { dateFormat } from '../../../../helper';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import Snackbar from 'material-ui/Snackbar';
import {
	List,
	ListItem
} from 'material-ui/List';

import {
	getIncomingOrders,
	getOrderDetails,
	confirmOrder
} from '../actions';

export class IncomingOrder extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'showOrder'        : {},
			'openSnack'        : false,
			'messageSnack'     : '',
			'autoHideDuration' : 4000,
		} );

		this.props.getIncomingOrders();
	}

	componentWillReceiveProps ( nextProps ) {
	}

	onChange ( key ) {
		return ( e ) => {
			let state = JSON.parse( JSON.stringify( this.state ) );

			state[ key ] = e.target.value;

			this.setState( state );
		}
	}

	showOrderDetails ( key ) {
		let state = JSON.parse( JSON.stringify( this.state ) );

		state.showOrder[ key ] = !state.showOrder[ key ];

		if ( !( this.props.details[ key ] || [] ).length ) {
			this.props.getOrderDetails( key );
		}

		this.setState( state )
	}

	handleConfirmOrder ( snap ) {
		if ( this.props.details[ snap.key ] ) {
			let obj = {
				'date_confirmed' : dateFormat()
			};

			let body = Object.assign( obj, snap.val() );

			return this.props.confirmOrder( snap.key, body );
		}
		return this.setState( {
			'openSnack'    : true,
			'messageSnack' : 'Please check the items for Order ' + snap.val().date_added + ' first'
		} );
	}

	handleRequestClose () {
		this.setState( {
			'openSnack' : false
		} );
	}

	render () {
		let orders = [];
		let styles = {
			'badge' : {
				'padding'   : '16px 24px 12px 12px',
				'marginTop' : '4px'
			},
			'paper' : {
				'padding' : '20px'
			}
		};

		if ( Object.keys( this.props.orders ).length ) {
			this.props.orders.forEach( snap => {
				let data        = snap.val();
				let primaryText = 'Order ' + data.date_added;
				let nestedItems = [];
				let details     = this.props.details[ snap.key ];
				let rightBtn    = <IconButton
					iconClassName="material-icons"
					tooltip="Confirm Order"
					tooltipPosition="top-center"
					onTouchTap={ () => this.handleConfirmOrder( snap ) }>done_all</IconButton>;

				Object.keys( ( details || {} ) ).map( ( detailsKey, index ) => {
					let item = details[ detailsKey ];
					nestedItems.push( <ListItem key={ index }
						primaryText={ item.name }
						rightIcon={ <Badge
							badgeContent={ item.quantity }
							secondary={ true } style={ styles.badge }>
								<i className="material-icons">shopping_cart</i>
							</Badge>
						} />
					);
				} );
				orders.push(
					<ListItem
						key={ snap.key }
						primaryText={ primaryText }
						open={ this.state.showOrder[ snap.key ] }
						nestedItems={ nestedItems }
						rightIconButton={ rightBtn }
						onTouchTap={ () => this.showOrderDetails( snap.key ) } />
				);
			} );
		}
		return (
			<Paper zDepth={2} style={ styles.paper }>
				<List>{ orders }</List>
				<Snackbar
					open={ this.state.openSnack }
					message={ this.state.messageSnack }
					autoHideDuration={ this.state.autoHideDuration }
					onRequestClose={ this.handleRequestClose.bind( this ) } />
			</Paper>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'orders'  : state.productListReducer.orders,
		'details' : state.productListReducer.details
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		getIncomingOrders () {
			dispatch( getIncomingOrders() );
		},

		getOrderDetails ( key ) {
			dispatch( getOrderDetails( key ) );
		},

		confirmOrder ( key, body ) {
			dispatch( confirmOrder( key, body ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( IncomingOrder );

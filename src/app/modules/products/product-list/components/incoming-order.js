import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
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
			'showOrder' : {}
		} );

		this.props.getIncomingOrders();
	}

	componentWillReceiveProps ( nextProps ) {
	}

	onChange ( key ) {
		return ( e ) => {
			let state = _.cloneDeep( this.state );

			state[ key ] = e.target.value;

			this.setState( state );
		}
	}

	showOrderDetails ( key ) {
		let state = _.cloneDeep( this.state );

		state.showOrder[ key ] = !state.showOrder[ key ];

		if ( !( this.props.details[ key ] || [] ).length ) {
			this.props.getOrderDetails( key );
		}

		this.setState( state )
	}

	handleConfirmOrder ( key ) {
		/* TODO: add confirm order */
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

		if ( this.props.orders.node_ ) {
			this.props.orders.forEach( snap => {
				let data = snap.val();
				let primaryText = 'Order ' + data.date_added;
				let rightBtn = <IconButton
					iconClassName="material-icons"
					tooltip="Confirm Order"
					tooltipPosition="top-center"
					onTouchTap={ () => this.handleConfirmOrder( snap.key ) }>thumb_up</IconButton>;
				let nestedItems = [];

				( this.props.details[ snap.key ] || [] ).map( ( item, index ) => {
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

		confirmOrder ( key ) {
			dispatch( confirmOrder( key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( IncomingOrder );

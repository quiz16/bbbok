import React from 'react';
import { connect } from 'react-redux';
import {
	numberFormat,
	dateFormat
} from '../../../../helper';

import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
	Card,
	CardActions,
	CardHeader,
	CardText
} from 'material-ui/Card';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

import {
	offListener
} from '../actions';

export class HistoryProduct extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'refresh' : 'loading'
		} );
	}

	componentWillUnmount () {
		this.props.offListener( 'History', this.props.id );
	}

	componentWillReceiveProps ( nextProps ) {
		if ( Object.keys( nextProps.history ).length ) {
			this.setState( {
				'refresh' : 'hide'
			} );
		}
	}


	render () {
		let rows    = [];
		let history = this.props.history;
		let styles  = {
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

		if ( Object.keys( history ).length ) {
			console.log( history );
			Object.keys( history ).map( key => {
				let currentHis = history[ key ];
				let cardText   = [];
				let titleCat   = {
					'incoming_order' : 'Incoming Order',
					'product_add'    : 'Product Add'
				};
				let itemCat = {
					'date_added'     : 'Date Added',
					'name'           : 'Name',
					'quantity'       : 'Quantity',
					'reseller_price' : 'Reseller\'s Price',
					'retail'         : 'Retail Price'
				};

				Object.keys( history[ key ] ).map( ( item, index ) => {
					if ( item !== 'initiator' ) {
						cardText.push(
							<TableRow key={ index }>
								<TableRowColumn>{ itemCat[ item ] }</TableRowColumn>
								<TableRowColumn><strong>{ currentHis[ item ] }</strong></TableRowColumn>
							</TableRow>
						);
					}
				} );
				rows.push(
					<Card key={ key }>
						<CardHeader
							title={ titleCat[ currentHis.initiator ] }
							subtitle={ currentHis.date_added }
							actAsExpander={ true }
							showExpandableButton={ true }
						/>
						<CardText expandable={ true }>
							<Table>
								<TableBody
									displayRowCheckbox={ false }>
									{ cardText }
								</TableBody>
							</Table>
						</CardText>
					</Card>
				);
			} );
		}

		return (
			<div >
				<Paper zDepth={2}>
					<div className="details-wrapper">
						{ rows }
					</div>
					<RefreshIndicator
						size={ 50 }
						left={ -25 }
						top={ 10 }
						loadingColor={ styles.spinner.loadingColor }
						status={ this.state.refresh }
						style={ styles.spinner.style }
					/>
				</Paper>
			</div>
		);
	}
}

function mapsStateToProps ( state ) {
	return {
		'details' : state.productViewReducer.details
	};
}

function mapsDispatchToProps ( dispatch ) {
	return {
		offListener ( keyPar, key ) {
			dispatch( offListener( keyPar, key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( HistoryProduct );

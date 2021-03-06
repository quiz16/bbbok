import React from 'react';
import { connect } from 'react-redux';
import {
	numberFormat,
	dateFormat
} from '../../../../helper';

import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

import {
	getProduct,
	offListener
} from '../actions';

export class DetailsProduct extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.names = [ {
			'label' : 'Name',
			'key'   : 'name'
		}, {
			'label' : 'Quantity',
			'key'   : 'quantity'
		}, {
			'label' : 'Price',
			'key'   : 'reseller_price'
		}, {
			'label' : 'Category',
			'key'   : 'category'
		}, {
			'label' : 'Updated By',
			'key'   : 'change_by'
		}, {
			'label' : 'Date Added',
			'key'   : 'date_added'
		}, {
			'label' : 'Date Updated',
			'key'   : 'last_updated'
		} ];
		this.setState( {
			'refresh' : 'loading'
		} );

		this.props.getProduct( this.props.id );
	}

	componentWillUnmount () {
		this.props.offListener( 'List', this.props.id );
	}

	componentWillReceiveProps ( nextProps ) {
		if ( Object.keys( nextProps.details ).length ) {
			this.setState( {
				'refresh' : 'hide'
			} );
		}
	}


	render () {
		let rows    = [];
		let details = this.props.details;
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

		if ( Object.keys( details ).length ) {
			this.names.map( ( item, index ) => {
				let value = details[ item.key ];

				if ( item.label === 'Category' ) {
					value = value ? 'Body' : 'Face';
				}

				rows.push(
					<TableRow key={ index }>
						<TableRowColumn>{ item.label }</TableRowColumn>
						<TableRowColumn><strong>{ value }</strong></TableRowColumn>
					</TableRow>
				);
			} );
		}

		return (
			<div >
				<Paper zDepth={2}>
					<div className="details-wrapper">
						<Table>
							<TableBody
								displayRowCheckbox={ false }>
								{ rows }
							</TableBody>
						</Table>
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
		getProduct ( key ) {
			dispatch( getProduct( key ) );
		},

		offListener ( keyPar, key ) {
			dispatch( offListener( keyPar, key ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( DetailsProduct );

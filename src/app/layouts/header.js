import React from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

export class Header extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'open' : false
		} );
	}

	toggleDrawer () {
		this.setState( {
			'open' : true
		} );
	}

	handleClose () {
		this.setState( {
			'open' : false
		} );
	}

	render () {
		return (
			<div className="header-wrapper">
				<AppBar title={ this.props.title } onLeftIconButtonTouchTap={ this.toggleDrawer.bind( this ) }/>
				<Drawer
					docked={ false }
					width={ 200 }
					open={ this.state.open }
					onRequestChange={ ( open ) => this.setState( { open } ) } >
					<MenuItem onTouchTap={ this.handleClose.bind( this ) } >Menu Item</MenuItem>
					<MenuItem onTouchTap={ this.handleClose.bind( this ) } >Menu Item 2</MenuItem>
				</Drawer>
			</div>
		);
	}
}

const mapsStateToProps = ( state ) => {
	return {
	};
}

const mapsDispatchToProps =  ( dispatch ) => {
	return {
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( Header );



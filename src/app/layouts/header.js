import React from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import auth from '../auth';

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
		if ( auth.getUser() ) {
			this.setState( {
				'open' : true
			} );
		}
	}

	handleClose () {
		this.setState( {
			'open' : false
		} );
	}

	handleLogout () {
		firebase.auth().signOut();
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
					<MenuItem onTouchTap={ this.handleLogout } >Logout</MenuItem>
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



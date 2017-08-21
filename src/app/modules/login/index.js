import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from '../../layouts/header';
import auth from '../../auth';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component {
	constructor () {
		super();
	}

	componentWillMount () {
		this.setState( {
			'email'    : null,
			'password' : null
		} );
	}

	handleSignIn () {
		let state = JSON.parse( JSON.stringify( this.state ) );
		let self  = this;

		auth.signIn( state ).then( () => {
			self.props.goTo( '/products' );
		} ).catch( error => {
			let code = error.code;

			state.emailErr = null;
			state.passErr  = null;

			if ( code.indexOf( 'email' ) !== -1 || code.indexOf( 'user' ) !== -1 ) {
				state.emailErr = error.message;
			}

			if ( code.indexOf( 'password' ) !== -1 ) {
				state.passErr = error.message;
			}

			this.setState( state );
		} );
	}

	handleOnChange ( key ) {
		return ( e ) => {
			let state = JSON.parse( JSON.stringify( this.state ) );

			state[ key ] = e.target.value;

			this.setState( state );
		}
	}

	render () {
		return (
			<div>
				<Header title="Login" />
				<div className="login-wrapper">
					<Paper zDepth={2}>
						<div className="login-form-wrapper">
							<TextField
								type="text"
								hintText="Email"
								errorText={ this.state.emailErr }
								fullWidth={ true }
								autoFocus={ true }
								onChange={ this.handleOnChange( 'email' ) }
								autoComplete="new-password"
								/>
							<TextField
								type="password"
								hintText="Password"
								errorText={ this.state.passErr }
								fullWidth={ true }
								onChange={ this.handleOnChange( 'password' ) }
								autoComplete="new-password"
								/>
								<RaisedButton className="sign-in-btn" label="Sign In" onTouchTap={ this.handleSignIn.bind( this ) } fullWidth={ true } />
						</div>
					</Paper>
				</div>
			</div>
		);
	}
}

export function mapsStateToProps ( state ) {
	return {
	};
}

export function mapsDispatchToProps ( dispatch ) {
	return {
		goTo ( url ) {
			dispatch( push( url ) );
		}
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( Login );


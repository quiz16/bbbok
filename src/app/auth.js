//import config from './config';
//import apiHandler from './common/api-handler';

/**
 ** API request for login and wait for jwt token
 **/
function login ( user ) {
	//return apiHandler
		//.post( '/api/v1/authenticate', user )
		//.then( function ( body ) {
			//localStorage.setItem( config.tokenName, body[ 0 ].token );
			//localStorage.setItem( 'current_user', body[ 1 ].user_name );
			//localStorage.setItem( 'user_cd', body[ 1 ].user_cd );
			//localStorage.setItem( 'authority', body[ 1 ].admin_flg );
			//localStorage.setItem( 'company',  JSON.stringify( body[ 2 ] ) );
			//return body[ 1 ];
		//} );
}

function loggedIn () {
	//let token = localStorage.getItem( config.tokenName );

	//if ( token ) {
		//return true;
	//}

	return false;
}

function requireAuth ( nextState, replace ) {
	if ( !loggedIn() ) {
		replace( {
			'pathname' : '/login',
			'state'    : {
				'nextPathname' : nextState.location.pathname
			}
		} );
	}
}

function checkIfLogin ( nextState, replace ) {
	if ( loggedIn() ) {
		replace( {
			'pathname' : '/dashboard',
			'state'    : {
				'nextPathname' : nextState.location.pathname
			}
		} );
	}
}

function getToken () {
	//return localStorage.getItem( config.tokenName );
}

function getCurrentUser () {
	return localStorage.getItem( 'current_user' );
}

function getAuthority () {
	return localStorage.getItem( 'authority' );
}

export default {
	login,
	loggedIn,
	requireAuth,
	checkIfLogin,
	getToken,
	getCurrentUser,
	getAuthority
};


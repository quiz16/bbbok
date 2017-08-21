const signIn = ( state ) => {
	return firebase.auth().signInWithEmailAndPassword( state.email, state.password );
};

const getUser = () => {
	let authItem = Object.keys( window.localStorage )
	  .filter( item => item.startsWith( 'firebase:authUser' ) );

	if ( authItem[ 0 ] ) {
		return localStorage.getItem( authItem[ 0 ] );
	};
	return false;
};

const requireAuth = ( nextState, replace ) => {
	if ( !getUser() ) {
		replace( {
			'pathname' : '/login',
			'state' : {
				'nextPathname' : nextState.location.pathname
			}
		} );
	}
};

const checkIfLogin = ( nextState, replace ) => {
	if ( getUser() ) {
		replace( {
			'pathname' : '/products', // TODO: navigate to dashboard once it's complete
			'state' : {
				'nextPathname' : nextState.location.pathname
			}
		} );
	}
};

export default {
	getUser,
	checkIfLogin,
	requireAuth,
	signIn
};

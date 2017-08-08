import React from 'react';
import { connect } from 'react-redux';

import resources from './resources';

export class Dashboard extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<h1>Hello World!</h1>
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
	};
}

export default connect( mapsStateToProps, mapsDispatchToProps )( Dashboard );



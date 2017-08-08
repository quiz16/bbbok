import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import { Provider } from 'react-redux';
import routes from './routes';

import './styles';

injectTapEventPlugin();

const App = () => (
	<MuiThemeProvider >
		<Provider store={ store() } >
			<div>
				{ routes }
			</div>
		</Provider>
	</MuiThemeProvider>
);

ReactDOM.render(
	<App />,
	document.getElementById( 'app' )
);

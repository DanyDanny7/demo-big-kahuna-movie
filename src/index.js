/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from '@store';
import moment from 'moment';
import es_ES from 'antd/es/locale-provider/es_ES';
import 'moment/locale/es';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

moment.locale('es');

ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider locale={es_ES}>
			<Router>
				<App />
			</Router>
		</ConfigProvider>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

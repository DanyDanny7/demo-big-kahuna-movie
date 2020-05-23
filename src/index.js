import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import moment from 'moment';
import es_ES from 'antd/es/locale-provider/es_ES';
import 'moment/locale/es';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

moment.locale('es');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ConfigProvider locale={es_ES}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

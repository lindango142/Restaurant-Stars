import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';

import styles from './scss/application.scss'

render(
  // wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('contents')
);
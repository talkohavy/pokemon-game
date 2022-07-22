import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import { createMyStore } from './reduxxx/store';
import App from './App';

const store = createMyStore(window.MY_INITIAL_STATE);
delete window.MY_INITIAL_STATE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

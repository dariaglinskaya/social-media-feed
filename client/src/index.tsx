import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store";

import registerServiceWorker from './registerServiceWorker';

import { connect, Provider } from 'react-redux';
const ConnectedApp = connect((state) => {
  console.log("State");
  console.log(state);
  console.log("Store");
  console.log(store);
  return state;
})(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

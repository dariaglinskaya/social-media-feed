import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import store from "./store";
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import { connect, Provider } from 'react-redux';

interface IStateProps { }
interface IActionProps { }

export interface IAppProps extends IStateProps, IActionProps { }
export default class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router >
      </div>
    );
  }
}
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
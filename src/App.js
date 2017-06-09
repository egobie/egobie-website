import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory } from 'react-router/lib';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginPage from './Page/Login';
import ReservationListPage from './Page/ReservationList';
import eGobieReducer from './Reducer';
import eGobieSaga from './Saga';


const sagaMiddleware = createSagaMiddleware();
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...eGobieReducer,
    routing: routerReducer
  }),
  applyMiddleware(sagaMiddleware)
);

// Create a history of your choosing (we're using a browser history in this case)
const history = syncHistoryWithStore(browserHistory, store);

// Now you can dispatch navigation actions from anywhere!
// import { push } from 'react-router-redux'
// store.dispatch(push('/foo'))

sagaMiddleware.run(eGobieSaga);

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store = { store } >
          <Router history = { history }>
            <div>
              <Route exact path = "/" component = { ReservationListPage } />
              <Route path = "/login" component = { LoginPage } />
              <Route path = "/reservation" component = { ReservationListPage } />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

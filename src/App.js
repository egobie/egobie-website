import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginPage from './Page/Login';
import ReservationPage from './Page/Reservation';


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Route exact path = "/" component = { ReservationPage } />
            <Route path = "/login" component = { LoginPage } />
            <Route path = "/reservation" component = { ReservationPage } />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './Page/Login';
import ReservationPage from './Page/Reservation';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path = "/" component = { ReservationPage } />
          <Route path = "/login" component = { LoginPage } />
          <Route path = "/reservation" component = { ReservationPage } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

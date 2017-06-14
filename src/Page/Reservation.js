import React from 'react';
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LocalCarWash from 'material-ui/svg-icons/maps/local-car-wash';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { List, ListItem } from 'material-ui/List';


class ReservationPage extends React.Component {
  state = {
    backgroundColor: 'rgb(0, 188, 212)',
  };

  render() {
    return (
      <Paper zDepth = { 2 } >
        <AppBar
          title = "RESERVED"
          titleStyle = {{
            fontSize: 20,
          }}
          style = {{
            backgroundColor: this.state.backgroundColor,
          }}
          iconElementLeft = {
            <Link to = '/reservations'>
              <IconButton><HardwareKeyboardArrowLeft /></IconButton>
            </Link>
          }
          iconElementRight = {
            <IconButton><LocalCarWash /></IconButton>
          } />
        <List>
          <ListItem
            primaryText = "RESERVATION #"
            secondaryText = "ADFNNCF123"
          />
          <ListItem
            primaryText = "Location"
            secondaryText = "Exchange, Secaucus"
          />
          <ListItem
            primaryText = "Service"
            secondaryText = "Prestige, Car Wash, Lube Service"
          />
          <ListItem
            primaryText = "Date"
            secondaryText = "2017-05-06"
          />
          <ListItem
            primaryText = "Vehicle"
            secondaryText = "Y96EUV"
          />
          <ListItem
            primaryText = "Price"
            secondaryText = "$56.80"
          />
        </List>
      </Paper>
    );
  }
}

export default ReservationPage;

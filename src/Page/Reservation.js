import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import LocalCarWash from 'material-ui/svg-icons/maps/local-car-wash';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { List, ListItem } from 'material-ui/List';

import * as ReservationAction from '../Action/ReservationAction';


class ReservationPage extends React.Component {
  state = {
    reservation: {},
    openConfirmModal: false,
    backgroundColor: 'rgb(0, 188, 212)',
  };

  showConfirmModal = () => {
    this.setState({
      openConfirmModal: true,
    });
  }

  hideConfirmModal = () => {
    this.setState({
      openConfirmModal: false,
    });
  }

  changeStatus = () => {
    this.hideConfirmModal();
    this.props.changeStatus();
  }

  renderConfirmModal() {
    return (
      <Dialog
        title = { 'WARNING' }
        actions = {[
          <FlatButton
            label = "Cancel"
            onTouchTap = { this.hideConfirmModal }
          />,
          <FlatButton
            label = "Confirm"
            secondary = { true }
            onTouchTap = { this.changeStatus }
          />,
        ]}
        modal = { true }
        open = { this.state.openConfirmModal } >
        Are you sure to start this reservation?
      </Dialog>
    );
  }

  renderReservationDetail() {
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
            <IconButton onTouchTap = { () => { this.props.router.goBack(); } }>
              <HardwareKeyboardArrowLeft />
            </IconButton>
          }
          iconElementRight = {
            <IconButton><LocalCarWash /></IconButton>
          } />
        <List>
          <ListItem
            primaryText = "Location"
            secondaryText = "Exchange, Secaucus"
          />
          <ListItem
            primaryText = "Service"
            secondaryText = "Prestige, Car Wash, Lube Service"
          />
          <ListItem
            primaryText = "Customer"
            secondaryText = "Bo Huang 2019120383"
          />
          <ListItem
            primaryText = "Date"
            secondaryTextLines = { 2 }
            secondaryText = "2017-05-06 (Customer wants to pick up car by 01:00 P.M.)"
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
        <div style = {{
          display: 'flex',
          justifyContent: 'center',
        }} >
          <RaisedButton
            label = "START"
            primary = { true }
            onClick = { this.showConfirmModal }
            style = {{
              width: 250,
              marginTop: 15,
              marginBottom: 15,
            }} />
        </div>
      </Paper>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservation: nextProps.reservation,
    });
  }

  render() {
    let { reservation } = this.state;

    return (
      <div className="egobie-reservation-detail-page">
        { this.renderReservationDetail() }
        { this.renderConfirmModal() }
        <Dialog modal = { true } open = { !!reservation.changingStatus } >
          <LinearProgress mode = { "indeterminate" } />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    reservation: state.reservation,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: () => {
      dispatch({
        type: ReservationAction.RESERVATION_CHANGE_STATUS,
      })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage);

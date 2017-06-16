import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import LocalCarWash from 'material-ui/svg-icons/maps/local-car-wash';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';

import * as ReservationAction from '../Action/ReservationAction';


class ReservationPage extends React.Component {
  state = {
    reservation: {},
    openConfirmModal: false,
    changingStatus: false,
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

  hideReservationDetailModal = () => {
    this.props.onRequestClose();
  }

  changeStatus = () => {
    let { reservation } = this.state;

    this.hideConfirmModal();
    this.props.changeStatus(reservation.status, reservation.id);
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
    let { reservation } = this.props;

    return (
      <div>
        <AppBar
          title = "RESERVATION"
          titleStyle = {{
            fontSize: 20,
          }}
          iconElementLeft = {
            <IconButton><LocalCarWash /></IconButton>
          }
          iconElementRight = {
            <IconButton onTouchTap = { this.hideReservationDetailModal } >
              <NavigationClose />
            </IconButton>
          } />
        <List>
          <ListItem
            primaryText = "Service"
            secondaryText = { reservation.services }
          />
          <ListItem
            primaryText = "Price"
            secondaryText = { `${reservation.price}` }
          />
          <ListItem
            primaryText = "Location"
            secondaryTextLines = { 2 }
            secondaryText = { reservation.address }
          />
          <ListItem
            primaryText = "Customer"
            secondaryTextLines = { 2 }
            secondaryText = { `${reservation.firstName} ${reservation.lastName} ${reservation.phone}` }
          />
          <ListItem
            primaryText = "Vehicle"
            secondaryTextLines = { 2 }
            secondaryText = {
              `${reservation.plate} (${reservation.make} ${reservation.model}, ${reservation.color})`
            }
          />
          <ListItem
            primaryText = "Date"
            secondaryTextLines = { 2 }
            secondaryText = {
              `${reservation.day} (Customer wants to pick up car by 0${reservation.pickUpBy}:00 P.M.)`
            }
          />
        </List>
        <div style = {{
          display: 'flex',
          justifyContent: 'center',
        }} >
          <RaisedButton
            label = { reservation.status === 'RESERVED' ? 'START' : 'DONE' }
            primary = { reservation.status === 'RESERVED' }
            secondary = { reservation.status === 'IN_PROGRESS' }
            disabled = { reservation.status === 'DONE' }
            onClick = { this.showConfirmModal }
            style = {{
              width: 250,
              marginBottom: 15,
            }} />
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservation: nextProps.reservation,
      changingStatus: nextProps.changingStatus,
    });
  }

  render() {
    let { reservation, changingStatus } = this.state;

    return (
      <div className="egobie-reservation-detail-page">
        { this.renderReservationDetail() }
        { this.renderConfirmModal() }
        <Dialog modal = { true } open = { changingStatus } >
          <LinearProgress mode = { "indeterminate" } />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    changingStatus: state.reservation.changingStatus,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (status, serviceId) => {
      console.log(status);
      dispatch({
        type: ReservationAction.RESERVATION_CHANGE_STATUS,
        status, serviceId,
      })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage);

import React from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import ActionToday from 'material-ui/svg-icons/action/today';
import LocalCarWash from 'material-ui/svg-icons/maps/local-car-wash';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

import * as ReservationAction from '../Action/ReservationAction';
import Reservation from './Reservation';


class ReservationListPage extends React.Component {

  state = {
    tasks: [],
    locations: [],
    selectedLocations: [],
    selectedDate: null,
    loading: false,
    reservation: null,
    showReservationDetail: false,
  }

  selectDate = (event, date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    this.setState({
      selectedDate: `${year}-${month}-${day}`,
    });
  }

  selectLocation = (event, index, values) => {
    this.setState({
      selectedLocations: values,
    });
  }

  deselectLocation = (locationId) => {
    let locations = [].concat(this.state.selectedLocations);
    let index = locations.indexOf(locationId);

    if (index >= 0) {
      locations.splice(index, 1);
      this.setState({
        selectedLocations: locations,
      });
    }
  }

  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return 'Locations';
      default:
        return `${values.length} locations selected`;
    }
  }

  getAllTasks = () => {
    let { selectedLocations, selectedDate } = this.state;

    this.props.getAllTasks(selectedLocations, selectedDate);
  }

  renderSelectedLocations() {
    let { locations, selectedLocations } = this.state;

    return (
      <div style = {{
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 20,
        marginRight: 20,
      }}>
        {
          selectedLocations.map((locationId, i) => {
            let location = locations.find((loc) => {
              return loc.id === locationId;
            });

            return (
              <Chip
                key = { i }
                onRequestDelete = { () => { this.deselectLocation(locationId); } }
                style = {{
                  marginTop: 4,
                }} >
                { location.name }
              </Chip>
            );
          })
        }
      </div>
    );
  }

  showReservationDetail = (reservation) => {
    this.setState({
      reservation: reservation,
      showReservationDetail: true,
    });
  }

  hideReservationDetail = () => {
    this.setState({
      reservation: null,
      showReservationDetail: false,
    });
  }

  renderFilter() {
    let { locations, selectedLocations, selectedDate } = this.state;

    return (
      <Paper style = {{
        marginBottom: 20,
        paddingBottom: 4,
      }} >
        <AppBar
          title = "SEARCH BY"
          titleStyle = {{
            fontSize: 18,
          }}
          iconElementLeft = {
            <IconButton><ContentFilterList /></IconButton>
          } />
        <DatePicker
          hintText = "Date"
          onChange = { this.selectDate }
          style = {{
            marginTop: 5,
            marginLeft: 20,
          }} />
        <SelectField
          multiple = { true }
          maxHeight = { 300 }
          value = { selectedLocations }
          onChange = { this.selectLocation }
          selectionRenderer = { this.selectionRenderer }
          menuStyle = {{
            borderWidth: 1,
          }}
          style = {{
            marginTop: 5,
            marginLeft: 20,
          }} >
          {
            locations && locations.map((location, i) => {
              return (
                <MenuItem
                  key = { i }
                  insetChildren = { true }
                  value = { location.id }
                  checked = { selectedLocations && selectedLocations.indexOf(location.id) > -1 }
                  primaryText = { location.name } />
              );
            })
          }
        </SelectField>
        { this.renderSelectedLocations() }
        <div style = {{
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 10,
          marginTop: 10,
        }}>
          <RaisedButton
            label = "SEARCH"
            primary = { true }
            fullWidth = { true }
            disabled = { !selectedDate || selectedLocations.length === 0 }
            onClick = { this.getAllTasks }
            style = {{
              marginLeft: 20,
              marginRight: 20,
            }} />
        </div>
      </Paper>
    );
  }

  renderReservationList() {
    let { tasksBy1, tasksBy5 } = this.state;

    return (
      <Paper zDepth = { 2 } >
        <AppBar
          title = "RESERVATIONS"
          titleStyle = {{
            fontSize: 18,
          }}
          iconElementLeft = {
            <IconButton><ActionToday /></IconButton>
          } />
        <List>
          <Subheader>Pick Up By 01:00 P.M.</Subheader>
          {
            tasksBy1 && tasksBy1.map((task, i) => {
              return (
                <ListItem
                  key = { i }
                  primaryText = { task.services }
                  secondaryText = { `${task.plate} (${task.make} ${task.model}, ${task.color})` }
                  secondaryTextLines = { 2 }
                  leftIcon = { <LocalCarWash /> }
                  rightIcon = { <HardwareKeyboardArrowRight /> }
                  onClick = { () => { this.showReservationDetail(task) } }
                />
              )
            })
          }
        </List>
        <Divider inset = { true } />
        <List>
          <Subheader>Pick Up By 05:00 P.M.</Subheader>
          {
            tasksBy5 && tasksBy5.map((task, i) => {
              return (
                <ListItem
                  key = { i }
                  primaryText = { task.services }
                  secondaryText = { `${task.plate} (${task.make} ${task.model}, ${task.color})` }
                  secondaryTextLines = { 2 }
                  leftIcon = { <LocalCarWash /> }
                  rightIcon = { <HardwareKeyboardArrowRight /> }
                  onClick = { () => { this.showReservationDetail(task) } }
                />
              )
            })
          }
        </List>
      </Paper>
    );
  }

  renderReservationDetail() {
    return (
      <Dialog
        autoScrollBodyContent = { true }
        open = { this.state.showReservationDetail }
        onRequestClose = { this.hideReservationDetail  }
        contentStyle = {{
          width: '95%',
          paddingLeft: -10,
        }} >
        <Reservation
          reservation = { this.state.reservation }
          onRequestClose = { this.hideReservationDetail }
        />
      </Dialog>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tasksBy1: nextProps.tasksBy1,
      tasksBy5: nextProps.tasksBy5,
      locations: nextProps.locations,
      loading: nextProps.loading,
      showReservationDetail: !(!!nextProps.tasksBy1 && !!nextProps.tasksBy5),
    });
  }

  render() {
    return (
      <div className = "egobie-reservation-list-page">
        { this.renderFilter() }
        { this.renderReservationList() }
        { this.renderReservationDetail() }
        <Dialog modal = { true } open = { !!this.state.loading } >
          <LinearProgress mode = { "indeterminate" } />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.reservation,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: (placeIds, day) => {
      dispatch({
        type: ReservationAction.RESERVATION_GET_ALL,
        placeIds, day,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationListPage);

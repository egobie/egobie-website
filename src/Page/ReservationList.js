import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
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


class ReservationListPage extends React.Component {

  state = {
    reservation: {},
    selectedLocations: [],
    locations: [
      {
        "id": 1,
        "name": "Xchange at Secaucus Junction",
        "address": "7000 Riverside Station Boulevard, Secaucus, NJ 07094",
        "latitude": 40.7657505,
        "longitude": -74.0823153
      },
      {
        "id": 2,
        "name": "Kearny Point",
        "address": "78 John Miller Parkway, Kearny, NJ 07032",
        "latitude": 40.72450439999999,
        "longitude": -74.10944999999998
      },
      {
        "id": 3,
        "name": "2200 Fletcher, Fort Lee",
        "address": "2200 Fletcher Avenue, Fort Lee, NJ 07024",
        "latitude": 40.8600983,
        "longitude": -73.9719454
      },
      {
        "id": 4,
        "name": "101 Eisenhower Parkway, Roseland",
        "address": "101 Eisenhower Parkway, Roseland, NJ 07068",
        "latitude": 40.8278267,
        "longitude": -74.32097820000001
      },
      {
        "id": 5,
        "name": "103 Eisenhower Parkway, Roseland",
        "address": "103 Eisenhower Parkway, Roseland, NJ 07068",
        "latitude": 40.8293318,
        "longitude": -74.3195599
      },
      {
        "id": 6,
        "name": "105 Eisenhower Parkway, Roseland",
        "address": "105 Eisenhower Parkway, Roseland, NJ 07068",
        "latitude": 40.830956,
        "longitude": -74.31865040000002
      },
      {
        "id": 7,
        "name": "201 Route 17 North, Rutherford",
        "address": "201 Route 17 North, Rutherford, NJ 07070",
        "latitude": 40.8171237,
        "longitude": -74.10148509999999
      },
      {
        "id": 8,
        "name": "301 Route 17 North, Rutherford",
        "address": "301 Route 17 North, Rutherford, NJ 07070",
        "latitude": 40.8178045,
        "longitude": -74.1012943
      },
      {
        "id": 9,
        "name": "555 US 1, Iselin",
        "address": "555 US-1, Iselin, NJ 08830",
        "latitude": 40.5592582,
        "longitude": -74.30493790000003
      },
      {
        "id": 10,
        "name": "510 Thornhall Street, Edison",
        "address": "510 Thornhall Street, Edison, NJ 08837",
        "latitude": 40.5654171,
        "longitude": -74.33204710000001
      },
      {
        "id": 11,
        "name": "333 Meadowlands Parkway, Secaucus",
        "address": "333 Meadowlands Parkway, Secaucus, NJ 07094",
        "latitude": 40.7795858,
        "longitude": -74.08218390000002
      },
      {
        "id": 12,
        "name": "4 Century Drive, Parsippany",
        "address": "4 Century Drive, Parsippany, NJ 07054",
        "latitude": 40.850838,
        "longitude": -74.4544694
      },
      {
        "id": 13,
        "name": "5 Century Drive, Parsippany",
        "address": "5 Century Drive, Parsippany, NJ 07054",
        "latitude": 40.8485577,
        "longitude": -74.45460450000002
      },
      {
        "id": 14,
        "name": "6 Century Drive, Parsippany",
        "address": "6 Century Drive, Parsippany, NJ 07054",
        "latitude": 40.8490242,
        "longitude": -74.45402460000003
      },
      {
        "id": 15,
        "name": "100 South Jefferson Road, Whippany",
        "address": "100 South Jefferson Road, Whippany, NJ 07981",
        "latitude": 40.8178412,
        "longitude": -74.4430499
      },
      {
        "id": 16,
        "name": "110 South Jefferson Road, Whippany",
        "address": "110 South Jefferson Road, Whippany, NJ 07981",
        "latitude": 40.8167625,
        "longitude": -74.44320809999999
      },
      {
        "id": 17,
        "name": "1 Bloomfield Avenue, Mountain Lakes",
        "address": "1 Bloomfield Avenue, Mountain Lakes, NJ, 07046",
        "latitude": 40.876568,
        "longitude": -74.43737099999998
      },
      {
        "id": 18,
        "name": "49 Bloomfield Avenue, Mountain Lakes",
        "address": "49 Bloomfield Avenue, Mountain Lakes, NJ, 07046",
        "latitude": 40.875523,
        "longitude": -74.4369451
      },
      {
        "id": 19,
        "name": "330 Changebridge Road, Pine Brook",
        "address": "330 Changebridge Road, Pine Brook, NJ 07058",
        "latitude": 40.8650216,
        "longitude": -74.34607369999998
      }
    ]
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
        return 'Location List';
      default:
        return `${values.length} locations selected`;
    }
  }

  loadTasks = () => {
    this.props.loadTasks({
      locations: this.state.selectedLocations,
    });
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

  renderFilter() {
    let { locations, selectedLocations } = this.state;

    return (
      <Paper style = {{
        marginBottom: 20,
        paddingBottom: 4,
      }} >
        <AppBar
          title = "CHOOSE LOCATION"
          titleStyle = {{
            fontSize: 18,
          }}
          iconElementLeft = {
            <IconButton><ContentFilterList /></IconButton>
          } />
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
            locations.map((location, i) => {
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
            disabled = { selectedLocations.length === 0 }
            onClick = { this.loadTasks }
            style = {{
              marginLeft: 20,
              marginRight: 20,
            }} />
        </div>
      </Paper>
    );
  }

  renderReservationList() {
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
          <Link to = { '/reservation/1' }>
            <ListItem
              primaryText = "Premium Plus"
              secondaryText = "Y96EUV, Honda Accord, Gray, 2017"
              secondaryTextLines = { 2 }
              leftIcon = { <LocalCarWash /> }
              rightIcon = { <HardwareKeyboardArrowRight /> }
            />
          </Link>
        </List>
        <Divider inset = { true } />
        <List>
          <Subheader>Pick Up By 05:00 P.M.</Subheader>
          <Link to = { '/reservation/1' }>
            <ListItem
              primaryText = "Premium Plus"
              secondaryText = "Y96EUV, Honda Accord, Gray, 2017"
              secondaryTextLines = { 2 }
              leftIcon = { <LocalCarWash /> }
              rightIcon = { <HardwareKeyboardArrowRight /> }
            />
          </Link>
        </List>
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
      <div className = "egobie-reservation-list-page">
        { this.renderFilter() }
        { this.renderReservationList() }
        <Dialog modal = { true } open = { reservation.loading } >
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
    loadTasks: (criteria) => {
      dispatch({
        type: ReservationAction.RESERVATION_GET_ALL,
        criteria,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationListPage);

import * as Action from '../Action/ReservationAction';


const reservation = {
  tasksBy1: [],
  tasksBy5: [],
  locations: [],
  loading: false,
  changingStatus: false,
};

const serializeReservations = (reservations) => {
  let tasksBy1 = [];
  let tasksBy5 = [];

  for (let reservation of reservations) {
    let services = reservation.services.map((service) => {
      return service.name;
    });
    let r = {
      id: reservation.id,
      address: reservation.address,
      day: reservation.day,
      price: `$${reservation.price}`,
      status: reservation.status,
      firstName: reservation.firstName,
      lastName: reservation.lastName,
      phone: reservation.phone,
      plate: reservation.plate,
      state: reservation.state,
      color: reservation.color,
      year: reservation.year,
      make: reservation.make,
      model: reservation.model,
      pickUpBy: reservation.pickUpBy,
      services: services.length > 0 ? services.join(', ') : null,
    };

    if (reservation.pickUpBy === 1) {
      tasksBy1.push(r);
    } else {
      tasksBy5.push(r);
    }
  }

  return {
    tasksBy1, tasksBy5,
  }
}

export default (state = reservation, action) => {
  switch (action.type) {
    case Action.RESERVATION_GET_ALL:
      return Object.assign({}, state, {
        loading: true,
      });
    
    case Action.RESERVATION_GET_ALL_SUCCESS:
      let reservations = serializeReservations(action.reservations);

      return Object.assign({}, state, {
        loading: false,
        ...reservations,
      });

    case Action.RESERVATION_GET_ALL_FAIL:
    case Action.RESERVATION_GET_ALL_ERROR:
      return Object.assign({}, state, {
        tasksBy1: [],
        tasksBy5: [],
        loading: false,
      });

    case Action.RESERVATION_GET_LOCATIONS:
      return Object.assign({}, state, {
        loading: true,
      })

    case Action.RESERVATION_GET_LOCATIONS_SUCCESS:
      return Object.assign({}, state, {
        locations: action.locations,
        loading: false,
      });

    case Action.RESERVATION_GET_LOCATIONS_FAIL:
    case Action.RESERVATION_GET_LOCATIONS_ERROR:
      return Object.assign({}, state, {
        locations: [],
        loading: false,
      });

    case Action.RESERVATION_CHANGE_STATUS:
      return Object.assign({}, state, {
        changingStatus: true,
      });

    case Action.RESERVATION_CHANGE_STATUS_SUCCESS:
    case Action.RESERVATION_CHANGE_STATUS_FAIL:
    case Action.RESERVATION_CHANGE_STATUS_ERROR:
      return Object.assign({}, state, {
        changingStatus: false,
      });

    default:
      return state;
  }
}
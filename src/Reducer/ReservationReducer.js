import * as Action from '../Action/ReservationAction';


const reservation = {
  reserved: [],
  inProgress: [],
  done: [],
  loading: false,
};

const RESERVED = 'RESERVED';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';

const serializeReservations = (reservations) => {
  let reserved = [];
  let inProgress = [];
  let done = [];

  for (let reservation of reservations) {
    let services = reservation.services.map((service) => {
      return service.name;
    });
    let r = {
      id: reservation.id,
      reservationId: reservation.reservationId,
      location: reservation.location,
      plate: reservation.plate,
      price: `$${reservation.price}`,
      status: reservation.status,
      services: services.length > 0 ? services.join(', ') : null,
      pickUpBy: reservation.pickUpBy,
    };

    if (reservation.status === RESERVED) {
      reserved.push(r);
    } else if (reservation.status === IN_PROGRESS) {
      inProgress.push(r);
    } else if (reservation.status === DONE) {
      done.push(r);
    }
  }

  return {
    reserved, inProgress, done,
  }
}

export default (state = reservation, action) => {
  switch (action.type) {
    case Action.RESERVATION_GET_ALL:
      return Object.assign({
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
      return Object.assign({
        reserved: [],
        inProgress: [],
        done: [],
        loading: false,
      });

    default:
      return state;
  }
}
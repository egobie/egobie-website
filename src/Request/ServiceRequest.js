import send from './Request';

// No starting and trailing `/`
const prefix = 'service';

export const getAllServices = () => {
  return send('POST', `${prefix}`);
};

export const getAllReservations = () => {
  return send('POST', `${prefix}/reservation`);
};

export const getPlaces = () => {
  return send('POST', `${prefix}/place`);
};
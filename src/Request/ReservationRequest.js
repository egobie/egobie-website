import send from './Request';

// No starting and trailing `/`
const prefix = 'egobie';

export const getAllTasks = (placeIds, day) => {
  return send('POST', `${prefix}/task`, {
    placeIds, day,
  });
};

export const getLocations = () => {
  return send('POST', `${prefix}/place`);
};

export const startTask = (serviceId) => {
  return send('POST', `${prefix}/task/progress`, {
    serviceId,
  });
};

export const finishTask = (serviceId) => {
  return send('POST', `${prefix}/task/done`, {
    serviceId,
  });
};

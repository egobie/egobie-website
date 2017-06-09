import send from './Request';


const prefix = 'user';

export const signIn = (email, password) => {
  return send('POST', 'signin', {
    email, password,
  });
};

export const updateUser = (firstName, lastName, email, phoneNumber) => {
  return send('POST', `${prefix}/update/user`, {
    firstName, lastName, email, phoneNumber,
  });
};
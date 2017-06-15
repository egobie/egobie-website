import send from './Request';


export const signIn = (email, password) => {
  return send('POST', 'signin', {
    email, password,
  });
};
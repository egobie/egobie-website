import * as Action from '../Action/UserAction';


const user = {
  id: -1,
  email: '',
  password: '',
  type: '',
  signedIn: false,
  loading: false,
};

const serializeUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    type: user.type,
  };
};

export default (state = user, action) => {
  switch (action.type) {
    case Action.USER_SIGN_IN:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.USER_SIGN_IN_SUCCESS:
      let user = serializeUser(action.user);

      global.eGobieUserId = user.id;
      global.eGobieUserToken = user.password;

      return Object.assign({}, state, {
        signedIn: true,
        loading: false,
        ...user,
      });

    case Action.USER_SIGN_IN_FAIL:
    case Action.USER_SIGN_IN_ERROR:
      return Object.assign({}, state, {
        id: -1,
        email: '',
        password: '',
        type: '',
        signedIn: false,
        loading: false,
      });

    default:
      return state;
  }
}
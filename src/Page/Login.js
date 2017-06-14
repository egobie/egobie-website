import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import RaisedButton from 'material-ui/RaisedButton';

import * as UserAction from '../Action/UserAction';


const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email) => {
  return regEmail.test(email);
};

class LoginPage extends React.Component {
  pageTitle = (
    <h3>Sign In</h3>
  );

  state = {
    user: {},
    formState: {
      email: true,
      password: true,
    },
    formValue: {
      email: '',
      password: '',
    },
  };

  changeEmail = (evt) => {
    this.setState({
      formValue: {
        email: evt.target.value,
        password: this.state.formValue.password,
      },
      formState: {
        email: validateEmail(evt.target.value),
        password: this.state.formState.password,
      },
    });
  }

  changePassword = (evt) => {
    this.setState({
      formValue: {
        email: this.state.formValue.email,
        password: evt.target.value,
      },
      formState: {
        email: this.state.formState.email,
        password: evt.target.value && evt.target.value.length > 0,
      },
    });
  }

  signIn = () => {
    let { email, password } = this.state.formValue;

    if (!validateEmail(email)) {
      this.setState({
        formState: {
          email: false,
          password: this.state.formState.password,
        },
      });
      this.emailTextField.focus();
      return;
    }

    if (!password || password.length === 0) {
      this.setState({
        formState: {
          email: this.state.formState.email,
          password: false,
        },
      });
      this.passwordTextField.focus();
      return;
    }

    this.props.signIn(email, password);
  }

  handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      this.signIn();
    }
  }

  renderSignInForm() {
    let { email, password } = this.state.formState;
    return (
      <Paper zDepth = { 2 } style = {{
        paddingBottom: 30,
      }}>
        <AppBar
          title = "SIGN IN"
          titleStyle = {{
            fontSize: 20,
          }}
          iconElementLeft = {
            <IconButton><ActionAccountCircle /></IconButton>
          } />
        <TextField
          ref = { (ref) => { this.emailTextField = ref; } }
          style = {{
            marginLeft: 20,
            marginRight: 20,
          }}
          floatingLabelText = "EMAIL"
          type = "email"
          errorText = { !email ? 'Invalid email address' : '' }
          onChange = { this.changeEmail }
          onKeyDown = { this.handleKeyDown }
        /><br />
        <TextField
          ref = { (ref) => { this.passwordTextField = ref; } }
          style = {{
            marginLeft: 20,
            marginRight: 20,
          }}
          floatingLabelText = "PASSWORD"
          type = "password"
          errorText = { !password ? 'Password is required' : '' }
          onChange = { this.changePassword }
          onKeyDown = { this.handleKeyDown }
        /><br />
        <RaisedButton
          label = "Submit"
          primary = { true }
          onClick = { this.signIn }
          style = {{
            marginLeft: 20,
            marginTop: 15,
          }}
        />
      </Paper>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
    });
  }

  render() {
    let { user } = this.state;

    return (
      <div className="egobie-login-page">
        { this.renderSignInForm() }
        <Dialog modal = { true } open = { user.loading } >
          <LinearProgress mode = { "indeterminate" } />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password) => {
      dispatch({
        type: UserAction.USER_SIGN_IN,
        email, password,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

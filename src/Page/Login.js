import React from 'react';
import {
  Panel, Form, FormGroup, FormControl, ControlLabel, Col, Button,
} from 'react-bootstrap'

const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email) => {
  return regEmail.test(email);
};

class LoginPage extends React.Component {
  pageTitle = (
    <h3>Sign In</h3>
  );

  state = {
    formState: {
      email: null,
      password: null,
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
        email: validateEmail(evt.target.value) ? 'success' : 'error',
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
        password: evt.target.value && evt.target.value.length >= 8 ? 'success' : 'error',
      },
    });
  }

  signIn = () => {
    let { email, password } = this.state.formValue;

    if (!validateEmail(email)) {
      this.setState({
        formState: {
          email: 'error',
          password: this.state.formState.password,
        },
      });
      return;
    }

    if (!password || password.length < 8) {
      this.setState({
        formState: {
          email: this.state.formState.email,
          password: 'error',
        },
      });
      return;
    }

    console.log(this.state.formValue);
  }

  renderSignInForm() {
    return (
      <Form horizontal>
        <FormGroup validationState = { this.state.formState.email } >
          <Col componentClass = { ControlLabel } sm = { 2 } >
            Email
          </Col>
          <Col sm = { 10 } >
            <FormControl
              type = "email"
              placeholder = "Email"
              onChange = { this.changeEmail } />
          </Col>
        </FormGroup>

        <FormGroup validationState = { this.state.formState.password } >
          <Col componentClass = { ControlLabel } sm = { 2 } >
            Password
          </Col>
          <Col sm = { 10 } >
            <FormControl
              type = "password"
              placeholder = "Password"
              onChange = { this.changePassword } />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset = { 2 } sm = { 10 } >
            <Button onClick = { this.signIn } >
              Sign In
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  render() {
    return (
      <div className="egobie-login-page">
        <Panel header = { this.pageTitle } >
          { this.renderSignInForm() }
        </Panel>
      </div>
    );
  }
}

export default LoginPage;

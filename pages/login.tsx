import * as React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBInput, toast } from 'mdbreact';
import Router from 'next/router';
import Link from 'next/link';
import {FormValidationService} from '../src/services/FormValidationService';
import PageLayout from '../src/components/PageLayout/PageLayout';
import AuthButton from '../src/components/AuthButton';
import AuthLogo from '../src/components/AuthLogo/AuthLogo';
import { ApiService, apiKeys } from '../src/services/ApiService';
import { LocalStorageService, lsKeys } from '../src/services/LocalStorageService';

interface IProps {
  setToken: (token: string) => void;
}

interface IState {
  isSubmitting: boolean,
  buttonText: string,
  email: string,
  password: string,
  strategy: string,
  errors: {
    email: string,
    password: string
  }
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSubmitting: false,
      buttonText: 'Login',
      email: '',
      password: '',
      strategy: 'local',
      errors: {
        email: 'Email is required',
        password: 'Password is required'
      }
    };
  }

  handleChange = (event) => {
    const state = Object.assign({}, this.state, FormValidationService.getChanges(event, this.state.errors));

    // we overwrite password check, we just need it not blank
    state.errors.password = this.state.password.length > 0 ? '' : 'Password is required';
    this.setState(state);
  };

  /**
   *
   * Note: Opted not to use AuthService because of the different processing of the API response.
   *
   * @param {*} ev Event object.
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true, buttonText: 'Please wait..' });

    if (FormValidationService.isValid(this.state.errors)) {
      // fetch data
      const req = {
        method: 'POST',
        path: apiKeys.auth,
        token: null,
        property: 'accessToken',
        body: {
          email: this.state.email,
          password: this.state.password,
          strategy: this.state.strategy
        }
      };
      
      const res = await ApiService.fetchData(req);

      // process response
      if (res.isSuccess) {
        // set to localStorage and redux store
        LocalStorageService.setItem(lsKeys.token, res.data.accessToken);
        this.props.setToken(res.data.accessToken);

        // route to index page
        toast.success('Authenticated!');
        Router.replace('/');
      } else {
        toast.error(res.data);
        this.setState({ isSubmitting: false, buttonText: 'Login' });
      }
    } else {
      toast.error('Email and password are required with correct email format');
      this.setState({ isSubmitting: false, buttonText: 'Login' });
    }
  };

  render() {
    return (
      <PageLayout>
        <AuthLogo />
        <form noValidate onSubmit={this.handleSubmit}>
          <MDBCard className="mb-2">
            <MDBCardBody>
              <MDBInput
                id="loginEmail"
                type="email"
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange} />
              <MDBInput
                id="loginPassword"
                type="password"
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange} />
              <Link href="/forgot-password">
                <a className="small-link">oops, I forgot my password</a>
              </Link>
            </MDBCardBody>
          </MDBCard>
          <AuthButton
            isDisabled={this.state.isSubmitting}
            btnText={this.state.buttonText}
            question={"Don't have an account?"}
            link={'/register'}
            linkText={'Sign up'} />
        </form>
      </PageLayout>
    )
  }
}

export default connect(null, null)(Login);

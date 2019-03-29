import * as React from 'react';
import Link from 'next/link';
import { MDBCard, MDBCardBody, MDBInput, toast } from 'mdbreact';
import AuthLogo from '../src/components/AuthLogo/AuthLogo';
import AuthButton from '../src/components/AuthButton';
import { AuthService } from '../src/services/AuthService';
import { FormValidationService } from '../src/services/FormValidationService';
import PageLayout from '../src/components/PageLayout/PageLayout';

interface IProps {}

interface IState {
  isSubmitted: boolean,
  isSubmitting: boolean,
  buttonText: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: string,
  errors: {
    email: string,
    password: string,
    firstName: string,
    lastName: string
  }
};

/**
 * Renders the Register page where potential users for the website can input the necessary information to allow then
 * access.
 */
class Register extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      isSubmitting: false,
      buttonText: 'Register',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'student',
      errors: {
        email: 'Email is required',
        password: 'Password is required',
        firstName: 'First Name is required',
        lastName: 'Last Name is required'
      }
    };
  }

  /**
   * Handles the changes made on a form and sets the values in the state accordingly.
   *
   * @param {*} ev Event object.
   */
  handleChange = ev => {
    const changes = FormValidationService.getChanges(ev, this.state.errors);
    this.setState(Object.assign({}, this.state, changes));
  };

  /**
   * Handles the event where the user submits the form. Sends a request with the form details.
   *
   * @param {*} ev Event object.
   */
  handleSubmit = async ev => {
    ev.preventDefault();
    this.setState(Object.assign({}, this.state, { isSubmitting: true, buttonText: 'Please wait..' }));

    if (FormValidationService.isValid(this.state.errors)) {
      const data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.role
      };
      const res = await AuthService.request(data, 'users', 'Register');
      this.setState({ ...res });
    } else {
      toast.error('Please review your info');
      this.setState({ isSubmitting: false, buttonText: 'Register' });
    }
  };

  /**
   * Renders the page accordingly.
   *
   * @returns JSX that renders the contents for '/register'.
   */
  render() {
    return (
      <PageLayout>
        <AuthLogo />
        {this.state.isSubmitted ? (
          <React.Fragment>
            <div className="card mb-2" id="card-form">
              <div className="card-content">
                <div style={{ textAlign: 'center' }}>
                  <h4>Registered!</h4>
                  <p className="small-link">We sent a verfication link in your email.</p>
                </div>
              </div>
            </div>
            <Link href="/login">
              <button type="button" className="btn btn-default btn-sm mb-3 btn-block">
                Login
              </button>
            </Link>
          </React.Fragment>
        ) : (
          <form onSubmit={this.handleSubmit} noValidate>
            <MDBCard className="mb-2">
              <MDBCardBody>
                <MDBInput
                  id="registerEmail"
                  type="email"
                  name="email"
                  label="Email address"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <MDBInput
                  id="registerPassword"
                  type="password"
                  name="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <MDBInput
                  id="registerFirstName"
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <MDBInput
                  id="registerLastName"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <div className="md-form" id="user-type-selection">
                  <p>Sign up as</p>
                  <div>
                    <input
                      id="registerStudent"
                      type="radio"
                      name="role"
                      className="form-control"
                      value="student"
                      checked={this.state.role === 'student'}
                      onChange={this.handleChange}
                    />
                    <label className="form-check-label" htmlFor="registerStudent">
                      Student
                    </label>
                  </div>
                  <div>
                    <input
                      id="registerInstructor"
                      type="radio"
                      name="role"
                      className="form-control"
                      value="instructor"
                      checked={this.state.role === 'instructor'}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="registerInstructor">Instructor</label>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
            <AuthButton
              isDisabled={this.state.isSubmitting}
              btnText={this.state.buttonText}
              question={'Already have an account?'}
              link={'/login'}
              linkText={'Login'}
            />
          </form>
        )}
      </PageLayout>
    );
  }
}

export default Register;

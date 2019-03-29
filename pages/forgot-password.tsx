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
  errors: {
    email: string
  }
}

/**
 * Renders the Forgot Password page where user can send a request to reset their forgotten password.
 */
class ForgotPassword extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSubmitted: false,
      isSubmitting: false,
      buttonText: 'Reset Password',
      email: '',
      errors: {
        email: 'Email is required'
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
    this.setState({ isSubmitting: true, buttonText: 'Please wait..' });

    if (FormValidationService.isValid(this.state.errors)) {
      const data = {
        action: 'sendResetPwd',
        value: {
          email: this.state.email
        }
      };
      const res = await AuthService.request(data, 'authMgmt', 'Reset Password');
      this.setState({ ...res });
    } else {
      toast.error('Valid email is required');
      this.setState({ isSubmitting: false, buttonText: 'Reset Password' });
    }
  };

  /**
   * Renders the page accordingly.
   *
   * @returns JSX that renders the contents for '/forgot-password'.
   */
  render() {
    return (
      <PageLayout>
        <AuthLogo />
        {this.state.isSubmitted ? (
          <MDBCard className="mb-2">
            <div className="card-content">
              <div>
                <MDBCardBody>
                  <p>Password reset request successful.</p>
                  <p>Please check your email.</p>
                  <Link href="/login">
                    <a className="small-link">Login here</a>
                  </Link>
                </MDBCardBody>
              </div>
            </div>
          </MDBCard>
        ) : (
          <form onSubmit={this.handleSubmit} noValidate>
            <MDBCard className="mb-2">
              <MDBCardBody>
                <p>Forgot your password? Type in your email address and we'll email you a link to reset it.</p>
                <MDBInput
                  id="passwordEmail"
                  type="email"
                  name="email"
                  label="Your email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
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

export default ForgotPassword;

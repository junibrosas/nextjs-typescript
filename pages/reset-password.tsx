import * as React from 'react';
import Link from 'next/link';
import { withRouter, RouterProps } from 'next/router';
import { MDBCard, MDBCardBody, MDBInput, toast } from 'mdbreact';
import AuthLogo from '../src/components/AuthLogo/AuthLogo';
import AuthButton from '../src/components/AuthButton';
import { AuthService } from '../src/services/AuthService';
import { FormValidationService } from '../src/services/FormValidationService';
import PageLayout from 'src/components/PageLayout/PageLayout';

interface IProps {
  router: RouterProps
};

interface IState {
  isSubmitted: boolean,
  isSubmitting: boolean,
  buttonText: string,
  token: string,
  password: string,
  errors: {
    password: string
  }
};;

/**
 * Renders the Reset Password page where users are redirected to after clicking on an email link to set a new password.
 */
class ResetPassword extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      isSubmitting: false,
      buttonText: 'Reset Now',
      token: '',
      password: '',
      errors: {
        password: 'Password is required'
      }
    };
  }

  /**
   * Sets the token acquired from the URL query.
   */
  componentDidMount() {
    const token = this.props.router.query.token;
    this.setState(Object.assign({}, this.state, { token: token }));
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
        action: 'resetPwdLong',
        value: {
          token: this.state.token,
          password: this.state.password
        }
      };
      const res = await AuthService.request(data, 'authMgmt', 'Reset Now');
      this.setState({ ...res });
    } else {
      toast.error('Password must not be less than 4 characters');
      this.setState({ isSubmitting: false, buttonText: 'Reset Now' });
    }
  };

  /**
   * Renders the page accordingly.
   *
   * @returns JSX that renders the contents for '/reset-password?token=<token'.
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
                  <p>Password reset was successful.</p>
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
                <p>Please enter your new password</p>
                <MDBInput
                  id="newPassword"
                  type="password"
                  name="password"
                  label="New Password"
                  value={this.state.password}
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

export default withRouter(ResetPassword);

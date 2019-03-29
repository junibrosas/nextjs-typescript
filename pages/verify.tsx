import * as React from 'react';
import Link from 'next/link';
import { withRouter, RouterProps } from 'next/router';
import { MDBCard, MDBCardBody } from 'mdbreact';
import AuthLogo from 'src/components/AuthLogo/AuthLogo';
import { ApiService, apiKeys } from 'src/services/ApiService';
import PageLayout from 'src/components/PageLayout/PageLayout';

interface IProps {
  router: RouterProps
}

interface IState {
  isError: false
};

/**
 * Renders the Verify page where users are redirected to after clicking on an email link to verify their registration.
 */
class Verify extends React.Component<IProps, IState> {
  /**
   * Initializes the object.
   *
   * @param {*} props Properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  /**
   * Sends a POST request to verify a user's registration.
   *
   * Note: Opted not to use AuthService because of the different processing of the API response.
   */
  async componentDidMount() {
    // fetch data
    const req = {
      method: 'POST',
      path: apiKeys.authMgmt,
      property: 'createdAt',
      body: {
        action: 'verifySignupLong',
        value: this.props.router.query.token
      }
    };
    const res = await ApiService.fetchData(req);

    // process response
    if (!res.isSuccess) {
      this.setState(Object.assign({}, this.state, { isError: true }));
    }
  }

  /**
   * Renders the page accordingly.
   *
   * @returns JSX that renders the contents for '/verify?token=<token>'.
   */
  render() {
    return (
      <PageLayout>
        <AuthLogo />
        <MDBCard className="mb-2">
          <div className="card-content">
            <div>
              <MDBCardBody>
                {this.state.isError ? (
                  <p>Oops! Something went wrong.</p>
                ) : (
                  <React.Fragment>
                    <p>Your account has been verified.</p>
                    <Link href="/login">
                      <a className="small-link">Login here</a>
                    </Link>
                  </React.Fragment>
                )}
              </MDBCardBody>
            </div>
          </div>
        </MDBCard>
      </PageLayout>
    );
  }
}

export default withRouter(Verify);

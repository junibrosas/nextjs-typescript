import AuthLogo from "src/components/AuthLogo/AuthLogo";

/**
 * Renders the Service Unavailable page where users are redirected to when an unexpected error is encountered while
 * browsing the website.
 *
 * @returns JSX that renders the contents for '/service-unavailable'.
 */
const ServiceUnavailable = () => {
  return (
    <div className="flex-center flex-column">
      <AuthLogo />
      <h4>Oops! Something went wrong.</h4>
      <br />
      <p>Please try again later.</p>
    </div>
  );
};

export default ServiceUnavailable;

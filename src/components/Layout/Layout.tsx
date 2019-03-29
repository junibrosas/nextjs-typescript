

import Head from 'next/head';
import { MDBAnimation, ToastContainer } from 'mdbreact';

const Layout = (props) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>E-Learning</title>
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
    </Head>
    <MDBAnimation type="fadeIn" style={{ height: '100vh' }}>
      {props.children}
    </MDBAnimation>
    <ToastContainer position="top-right" autoClose={3000} closeButton={false} pauseOnHover={false} newestOnTop={true} />
  </div>
);

export default Layout;
import React from 'react';
import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../src/redux/store';
import { Store } from 'redux';
import { IMainState } from 'src/reducers';
import Layout from '../src/components/Layout/Layout';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../src/style.css';

interface IProps {
  store: Store<IMainState>
}

class MyApp extends App<IProps> {
  static async getInitialProps({Component, ctx}: NextAppContext): Promise<DefaultAppIProps> {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
    };
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <Container>
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
import React from 'react';
import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { Provider } from 'react-redux';
import { RouterProps } from 'next/router';
import withRedux from 'next-redux-wrapper';
import makeStore from '../src/redux/store';
import { Store } from 'redux';
import { IMainState } from 'src/reducers';

export interface AppProps<T> {
  router: RouterProps<T>
}

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
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
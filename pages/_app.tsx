import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../src/redux/store';

class MyApp extends App<any, any> {
  static async getInitialProps({Component, ctx}) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
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
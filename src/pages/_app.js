import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import theme from '../constants/theme';

class OpenCollectiveFrontendApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <IntlProvider locale="en">
            <Component {...pageProps} />
          </IntlProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default OpenCollectiveFrontendApp;

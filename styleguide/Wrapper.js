import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/constants/theme';
import { IntlProvider } from 'react-intl';

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <IntlProvider locale="en">{this.props.children}</IntlProvider>
        </ThemeProvider>
      </Fragment>
    );
  }
}

import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import PrintableGiftCard from '../../src/components/PrintableGiftCard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <IntlProvider locale="en">
        <PrintableGiftCard
          amount={50000}
          currency="USD"
          code="8X4WWD2G"
          expiryDate="Wed May 13 2020 00:00:00 GMT+0200 (GMT+02:00)"
          withQRCode={false}
          tagline="I have no QR code!"
          style={{ marginRight: 15 }}
        />
      </IntlProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

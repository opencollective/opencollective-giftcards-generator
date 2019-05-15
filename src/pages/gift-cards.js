import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import { chunk } from 'lodash';

import PrintableGiftCard from '../components/PrintableGiftCard';

export default class Home extends Component {
  static propTypes = {
    format: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        /** The amount in cents */
        initialBalance: PropTypes.number.isRequired,
        /** Currency of the gift card (eg. `EUR`) */
        currency: PropTypes.string.isRequired,
        /** UUID of the card */
        uuid: PropTypes.string.isRequired,
        /** Expiry date */
        expiryDate: PropTypes.string,
      }),
    ),
  };

  static getInitialProps({ req }) {
    return { cards: req.body.cards, format: req.params.format };
  }

  getScaleRatio(fileFormat) {
    // See https://github.com/marcbachmann/node-html-pdf/issues/110
    return fileFormat === 'pdf' ? 0.75 : 1;
  }

  getPageStyle(cardsPerPage, paginatedCards) {
    return {
      width: '8.27in',
      // Don't force height on last iteration to avoid blank page
      height: paginatedCards.length === cardsPerPage ? '11.69in' : 'auto',
    };
  }

  render() {
    const { cards, format } = this.props;
    const scaleRatio = this.getScaleRatio(format);
    const cardsPerPage = 10;
    const chunks = chunk(cards, cardsPerPage);

    return (
      <Box css={{ zoom: 1 * scaleRatio }}>
        {chunks.map((paginatedCards, idx) => (
          <Box key={idx} py={5} css={this.getPageStyle(cardsPerPage, paginatedCards)}>
            <Flex flexWrap="wrap" justifyContent="center">
              {paginatedCards.map(c => (
                <Box key={c.uuid} css={{ width: '3.5in', height: '2in' }}>
                  <PrintableGiftCard
                    amount={c.initialBalance}
                    currency={c.currency}
                    code={c.uuid.split('-')[0]}
                    expiryDate={c.expiryDate}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        ))}
      </Box>
    );
  }
}

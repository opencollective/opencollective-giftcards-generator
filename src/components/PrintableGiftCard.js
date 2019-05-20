import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import { FormattedMessage, FormattedDate } from 'react-intl';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import { borderRadius, fontSize } from 'styled-system';

import { ExternalLink } from 'styled-icons/feather/ExternalLink';

import { imgUrl } from '../lib/utils';
import { WEBSITE_URL } from '../constants/env';
import Container from './Container';
import StyledHr from './StyledHr';
import { P, Span } from './Text';
import Currency from './Currency';

const Card = styled(Box)`
  font-family: Helvetica, sans-serif;
  width: 3.5in;
  height: 2in;
  position: relative;
  overflow: hidden;
  background-image: url('${imgUrl('oc-gift-card-front-straightened.png')}');
  background-size: 100%;
  background-repeat: no-repeat;
  border: 1px solid lightgrey;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media print {
    break-inside: avoid;
  }

  ${borderRadius};
  ${fontSize};
`;

const OpenCollectiveLogo = styled.img`
  width: 3em;
  height: 3em;
`;

/**
 * A static gift card meant to be printed to be offered to someone. It has standard
 * business card resolution (3.5in x 2in) but is rendered two time bigger for HDPI.
 */
const PrintableGiftCard = ({ amount, currency, code, expiryDate, tagline, withQRCode, ...styleProps }) => {
  const shortWebsiteUrl = WEBSITE_URL.replace('https://', '');
  const redeemUrl = `${WEBSITE_URL}/redeem/${code}`;
  const basePaddingX = '0.8em';
  const paddingTop = '1em';

  return (
    <Card {...styleProps}>
      {/** Header */}
      <Flex justifyContent="space-between" alignItems="center" px={basePaddingX} pt={paddingTop}>
        <Flex alignItems="center">
          <OpenCollectiveLogo src={imgUrl('opencollective-icon.svg')} alt="" />
          <Flex flexDirection="column" ml="0.8em">
            <P fontWeight="bold" fontSize="1.1em" lineHeight="1.5em">
              Open Collective
            </P>
            {tagline && (
              <P fontSize="0.7em" lineHeight="0.8em" color="white.transparent.72">
                {tagline}
              </P>
            )}
          </Flex>
        </Flex>

        <Container
          background="#69a0f1"
          color="#d7e8fe"
          borderRadius="1em"
          padding="0.25em 1em"
          boxShadow="2px 3px 5px rgba(0, 0, 0, 0.15)"
          fontWeight="bold"
          fontSize="0.7em"
        >
          <FormattedMessage id="GiftCard" defaultMessage="Gift card" />
        </Container>
      </Flex>

      {/** Content */}
      <Flex justifyContent="space-between" flex="1 1" mb="0.3em">
        {/** Left */}
        <Flex flexDirection="column" justifyContent="space-between" ml={basePaddingX}>
          <Box>
            <StyledHr mt="0.75em" mb="0.5em" borderColor="rgb(62, 129, 230)" borderRadius={8} />
            {expiryDate && (
              <P fontSize="0.55em" lineHeight="1.75em" color="black.300">
                <FormattedMessage
                  id="ContributePayment.expiresOn"
                  defaultMessage="Expires on {expiryDate}"
                  values={{
                    expiryDate: <FormattedDate value={expiryDate} day="numeric" year="numeric" month="long" />,
                  }}
                />
              </P>
            )}
          </Box>
          <P fontSize="0.8em">
            <ExternalLink size="1em" color="black" />
            <Span color="black.500" ml={1}>
              {shortWebsiteUrl}/redeem/
            </Span>
            <Span fontWeight="bold" color="black.800">
              {code}
            </Span>
          </P>
        </Flex>

        {/** Right */}
        <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end" pr={basePaddingX}>
          <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
            {withQRCode && (
              <Container height="4.5em" border="1px solid lightgrey" boxShadow="2px 5px 4px rgba(0,0,0,0.15)">
                {/** Use 2x the real size to get a better resolution */}
                <QRCode
                  renderAs="svg"
                  value={redeemUrl}
                  size={256}
                  fgColor="#313233"
                  style={{ width: '4.5em', height: '4.5em' }}
                />
              </Container>
            )}
            <Flex mt="1em" mb="0.1em">
              <Span fontWeight="bold" fontSize="2em" lineHeight="1em" color="#313233">
                <Currency value={amount} currency={currency} precision={0} />
              </Span>
              <Box ml="0.25em">
                <Span color="black.700" fontSize="0.9em" className="currency">
                  {currency}
                </Span>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

PrintableGiftCard.propTypes = {
  /** The amount in cents */
  amount: PropTypes.number.isRequired,
  /** Currency of the gift card (eg. `EUR`) */
  currency: PropTypes.string.isRequired,
  /** The 8 characters code of the gift card */
  code: PropTypes.string.isRequired,
  /** Expiry date */
  expiryDate: PropTypes.string,
  /** Border radius for the card */
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** If true, QR code will be displayed */
  withQRCode: PropTypes.bool,
  /** The tagline displayed under Open Collective logo */
  tagline: PropTypes.node,
  /** Main font size */
  fontSize: PropTypes.string,
};

PrintableGiftCard.defaultProps = {
  tagline: 'Transparent funding for open source',
  withQRCode: true,
  borderRadius: '0px',
  fontSize: '0.14in',
};

export default PrintableGiftCard;

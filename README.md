# Open Collective - Gift Cards Generator

[![Circle CI](https://circleci.com/gh/opencollective/opencollective-giftcards-generator/tree/master.svg?style=shield)](https://circleci.com/gh/opencollective/opencollective-giftcards-generator/tree/master)
[![Slack Status](https://slack.opencollective.org/badge.svg)](https://slack.opencollective.org)
[![Dependency Status](https://david-dm.org/opencollective/opencollective-giftcards-generator/status.svg)](https://david-dm.org/opencollective/opencollective-giftcards-generator)
[![Greenkeeper badge](https://badges.greenkeeper.io/opencollective/opencollective-giftcards-generator.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/opencollective/opencollective-giftcards-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/opencollective/opencollective-giftcards-generator)

## Foreword

If you see a step below that could be improved (or is outdated), please update the instructions. We rarely go through this process ourselves, so your fresh pair of eyes and your recent experience with it, makes you the best candidate to improve them for other users. Thank you!

## Development

### Prerequisite

Make sure you have Node.js version >= 10.
We recommend using [nvm](https://github.com/creationix/nvm): `nvm use`.

### Install

We recommend cloning the repository in a folder dedicated to `opencollective` projects.

```
git clone git@github.com:opencollective/opencollective-giftcards-generator.git opencollective/giftcards-generator
cd opencollective/giftcards-generator
npm install
```

### Start

- To start styleguide

```
npm run styleguide:dev
```

- To start the service:

```
npm run dev
```

### Tests

You can run the tests using `npm test`.

## Deployment

To deploy to staging or production, you need to be a core member of the Open Collective team.

### (Optional) Configure Slack token

Setting a Slack token will post a message on `#engineering` with the changes you're
about to deploy. It is not required, but you can activate it like this:

1. Go to https://api.slack.com/custom-integrations/legacy-tokens
2. Generate a token for the OpenCollective workspace
3. Add this token to your `.env` file:

```bash
OC_SLACK_USER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Staging (now)

```
npm run deploy:staging
```

- URL: https://giftcards-generator-staging.opencollective.com/

### Production (now)

```
npm run deploy:production
```

- URL: https://giftcards-generator.opencollective.com/

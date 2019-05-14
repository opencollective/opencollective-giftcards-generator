FROM node:11.8

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm ci

COPY . .

ARG PORT=3000
ENV PORT $PORT

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG WEBSITE_URL=https://staging.opencollective.com
ENV WEBSITE_URL $WEBSITE_URL

# Copy fonts and update fonts cache
RUN cp src/static/fonts/* /usr/share/fonts/
RUN fc-cache -f -v
RUN fc-list

# Show the phantom version, may be useful if we need to debug a production issue
RUN ./node_modules/phantomjs-prebuilt/bin/phantomjs --version

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]

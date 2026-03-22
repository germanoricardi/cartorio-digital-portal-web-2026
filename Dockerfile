FROM node:24.3.0-alpine

RUN apk add --no-cache tzdata \
  && cp /usr/share/zoneinfo/America/Cuiaba /etc/localtime \
  && echo "America/Cuiaba" > /etc/timezone

RUN npm install -g npm@latest

RUN mkdir -p /app && chown -R node:node /app

# Create app directory
WORKDIR /app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

#RUN npm run build

EXPOSE 3004

CMD [ "npm", "install"]
CMD [ "npm", "run", "dev" ]
FROM node:12-alpine as builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# node-gyp
RUN apk --no-cache add alpine-sdk python

COPY package*.json ./
RUN npm install

FROM node:12-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]

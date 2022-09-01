FROM node:14.18.0 as node_api

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

CMD ["yarn", "run", "dev"]
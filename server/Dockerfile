FROM node:14.18.0 as api

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

CMD ["yarn", "run", "dev"]
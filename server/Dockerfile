FROM node:14.18.0 as api
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 3001
CMD ["yarn", "start"]

FROM mysql:8.0.29 as MySQL_DB
COPY ./setup.sql /docker-entrypoint-initdb.d/setup.sql
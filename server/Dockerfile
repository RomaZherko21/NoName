FROM node:14.18.0 as api
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 3001
CMD ["yarn", "run", "dev"]
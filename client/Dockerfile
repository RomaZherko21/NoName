FROM node:14.18.0 as client
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 3000
CMD ["yarn", "start"]
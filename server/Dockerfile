FROM node:14.18.0
WORKDIR /app
COPY ./package.json ./yarn.lock ./
COPY ./ ./
RUN yarn
EXPOSE 3001
CMD ["yarn", "start"]
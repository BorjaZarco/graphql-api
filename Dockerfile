FROM node:12-alpine

WORKDIR /app

COPY . .
RUN apk add --no-cache make gcc g++ python
RUN npm install \
  && npm rebuild bcrypt --build-from-source
ENV PATH /app/node_modules/.bin:$PATH
RUN tsc


EXPOSE 5000
COPY ./environments/.env.docker ./.env
CMD ["node", "dist/index.js"]
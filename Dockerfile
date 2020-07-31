FROM node:12-alpine as build-stage

RUN mkdir /app

WORKDIR /app

ADD ./ /app

RUN yarn install

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build-stage /app/public/ /usr/share/nginx/html

COPY --from=build-stage /app/deploy/default.conf /etc/nginx/conf.d/default.conf

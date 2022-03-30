FROM node:16.14-alpine3.14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm run export

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
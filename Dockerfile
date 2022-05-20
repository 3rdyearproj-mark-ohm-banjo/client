FROM node:16.14-alpine3.14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g yarn --force
RUN yarn install
COPY . ./
RUN yarn run build

CMD ["yarn", "run", "start"]
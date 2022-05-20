FROM node:16.14-alpine3.14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

CMD ["npm", "run", "start"]
FROM node:18.19.0-slim

WORKDIR /backend

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

COPY .env .env.local ./

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
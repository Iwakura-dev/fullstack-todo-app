FROM node:18.19.0-slim

WORKDIR /frontend


COPY package*.json ./


RUN npm install


COPY . .

COPY .env .env.local ./


RUN npm run build


CMD ["npm", "run", "start"]
FROM node:18.19.0-slim

WORKDIR /backend

COPY package*.json yarn.lock ./

RUN npm install --force

COPY . .

COPY .env .env.development ./

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
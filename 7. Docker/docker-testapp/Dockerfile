FROM node:22

ENV MONGO_DB_USERNAME=admin
ENV MONGO_DB_PASSWORD=qwerty

WORKDIR /docker-testapp

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]

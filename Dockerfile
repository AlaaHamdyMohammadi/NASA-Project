FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm install-client --only=production

COPY Server/package*.json Server/
RUN npm install-Server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 5500
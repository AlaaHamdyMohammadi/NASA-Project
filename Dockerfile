FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --only=production

RUN npm run build --prefix client

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 5500
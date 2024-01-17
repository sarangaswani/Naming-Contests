FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["./start.sh"]

RUN chmod +x ./start.sh


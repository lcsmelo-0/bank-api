FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "JWT_SECRET_KEY=${JWT_SECRET}" > .env

RUN npm run build

CMD ["npm", "run", "start:prod"]
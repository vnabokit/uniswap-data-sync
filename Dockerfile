FROM node:16.20.1-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD npm run start:dev
EXPOSE 3000

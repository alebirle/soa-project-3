FROM node:16-alpine AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#EXPOSE 4200
WORKDIR /src/uis/ClientApp

COPY package*.json ./
RUN npm install


CMD ["ng", "serve", "--host", "0.0.0.0"]


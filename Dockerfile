# Build
FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build


# Server
FROM node:alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist/appPrenotazioneFrontEnd/browser /app

EXPOSE 80

CMD ["http-server", "/app", "-p", "80"]